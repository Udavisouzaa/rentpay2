'use server'

import { createClient } from '@/utils/supabase/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fake_key_to_bypass_build', {
  apiVersion: '2026-06-24.dahlia',
})

// O ID do Preço da Assinatura no Stripe Dashboard (Ex: price_12345)
// Coloque o seu Price ID real no .env futuramente.
const STRIPE_PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID || 'price_fake_123'

export async function createSubscriptionCheckout() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Usuário não autenticado')
  }

  // Verifica se o usuário já tem um customer ID na tabela subscriptions
  const { data: subData } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single()

  let customerId = subData?.stripe_customer_id

  // MVP Mock: Sem chaves reais do Stripe, ativamos direto no banco para demonstração
  const nextMonth = new Date()
  nextMonth.setDate(nextMonth.getDate() + 30)

  await supabase.from('subscriptions').upsert({
    user_id: user.id,
    stripe_customer_id: 'cus_mock123',
    status: 'active',
    current_period_end: nextMonth.toISOString()
  })

  // Simula o redirecionamento de sucesso do Stripe
  return { url: '/dashboard/billing?success=true' }
}
