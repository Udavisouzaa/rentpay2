import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { updateTenantScore } from '@/lib/scoreUpdater'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fake_key_to_bypass_build', {
  apiVersion: '2026-06-24.dahlia',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  console.log('Webhook Stripe recebido. Iniciando processamento...')
  
  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.error('Assinatura do Stripe ausente.')
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  // 1. Verificação oficial da assinatura do Stripe
  try {
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret)
      console.log('Assinatura validada com sucesso. Evento:', event.type)
    } else {
      // Fallback local se não houver secret (NÃO RECOMENDADO EM PRODUÇÃO)
      console.warn('STRIPE_WEBHOOK_SECRET não definido, ignorando verificação (Apenas Dev).')
      event = JSON.parse(rawBody) as Stripe.Event
    }
  } catch (err: any) {
    console.error(`Falha na verificação da assinatura: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // 2. Tratar eventos do Stripe
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // FLUXO A: PAGAMENTO DE ALUGUEL DO INQUILINO
    if (session.mode === 'payment') {
      const invoiceId = session.metadata?.invoice_id
      if (!invoiceId) return NextResponse.json({ received: true })

      console.log(`Processando pagamento para a fatura ID: ${invoiceId}`)
      const { data: currentInvoice, error: fetchError } = await supabase
        .from('invoices')
        .select('status, tenant_id')
        .eq('id', invoiceId)
        .single()

      if (!fetchError && currentInvoice?.status !== 'pago') {
        await supabase
          .from('invoices')
          .update({
            status: 'pago',
            data_pagamento: new Date().toISOString().split('T')[0],
            metodo_pagamento: 'stripe'
          })
          .eq('id', invoiceId)
          
        updateTenantScore(currentInvoice.tenant_id).catch(err => console.error(err))
      }
    } 
    // FLUXO B: ASSINATURA DO LOCADOR (SaaS Billing)
    else if (session.mode === 'subscription') {
      // O metadata pode vir do root da sessão
      const supabaseUserId = session.client_reference_id || session.metadata?.supabase_user_id
      const subscriptionId = session.subscription as string
      const customerId = session.customer as string

      if (subscriptionId && customerId) {
        console.log(`Ativando assinatura ${subscriptionId} para o customer ${customerId}`)
        
        // Busca a assinatura direto do Stripe para pegar o status e current_period_end
        const subscription: any = await stripe.subscriptions.retrieve(subscriptionId)

        if (supabaseUserId) {
          await supabase
            .from('subscriptions')
            .upsert({
              user_id: supabaseUserId,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
            }, { onConflict: 'user_id' })
        } else {
          // Atualiza baseando-se no customerId que já existe
          await supabase
            .from('subscriptions')
            .update({
              stripe_subscription_id: subscriptionId,
              status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
            })
            .eq('stripe_customer_id', customerId)
        }
      }
    }
  } 
  // 3. Atualizações na Assinatura (Renovação, Cancelamento, Atraso)
  else if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as any
    const subscriptionId = subscription.id

    console.log(`Atualizando status da assinatura ${subscriptionId} para ${subscription.status}`)

    await supabase
      .from('subscriptions')
      .update({
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
      })
      .eq('stripe_subscription_id', subscriptionId)
  } else {
    console.log(`Evento ${event.type} ignorado (Não mapeado).`)
  }

  // Responder rapidamente ao Stripe
  return NextResponse.json({ received: true })
}

