'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Plano gratuito: até 1 imóvel. Além disso, exige assinatura ativa (ou em teste).
const FREE_PROPERTY_LIMIT = 1

export async function createProperty(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const [{ count: propertyCount }, { data: sub }] = await Promise.all([
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase.from('subscriptions').select('status').eq('user_id', user.id).single(),
  ])

  const isPaid = sub?.status === 'active' || sub?.status === 'trialing'

  if (!isPaid && (propertyCount || 0) >= FREE_PROPERTY_LIMIT) {
    redirect('/dashboard/billing?upgrade=true')
  }

  const propertyData = {
    user_id: user.id,
    endereco: formData.get('endereco') as string,
    valor_aluguel: parseFloat(formData.get('valor_aluguel') as string),
    dia_vencimento: parseInt(formData.get('dia_vencimento') as string, 10),
    status: 'disponivel',
  }

  const { error } = await supabase.from('properties').insert(propertyData)

  if (error) {
    console.error('Error creating property:', error)
    redirect(`/dashboard/properties/new?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard')
  redirect('/dashboard?success=true&message=Imóvel cadastrado com sucesso!')
}

export async function updateProperty(id: string, formData: FormData) {
  const supabase = await createClient()

  const propertyData = {
    endereco: formData.get('endereco') as string,
    valor_aluguel: parseFloat(formData.get('valor_aluguel') as string),
    dia_vencimento: parseInt(formData.get('dia_vencimento') as string, 10),
  }

  const { error } = await supabase
    .from('properties')
    .update(propertyData)
    .eq('id', id)
    // RLS ensures they can only update their own property

  if (error) {
    console.error('Error updating property:', error)
    redirect(`/dashboard/properties/${id}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard')
  redirect('/dashboard?success=true&message=Imóvel atualizado com sucesso!')
}

export async function deleteProperty(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting property:', error)
    throw new Error(error.message)
  }

  revalidatePath('/dashboard')
  redirect('/dashboard?success=true&message=Imóvel removido com sucesso!')
}
