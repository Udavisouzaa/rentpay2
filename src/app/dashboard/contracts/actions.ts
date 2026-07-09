'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function createContract(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const property_id = formData.get('property_id') as string
  const tenant_id = formData.get('tenant_id') as string
  const start_date = formData.get('start_date') as string
  const end_date = formData.get('end_date') as string
  const rent_amount = formData.get('rent_amount') as string
  const due_day = formData.get('due_day') as string
  const readjustment_index = formData.get('readjustment_index') as string
  const guarantee_type = formData.get('guarantee_type') as string

  if (!property_id || !tenant_id || !start_date || !rent_amount || !due_day) {
    redirect('/dashboard/contracts/new?error=Preencha todos os campos obrigatórios')
  }

  const { error } = await supabase
    .from('contracts')
    .insert({
      owner_id: user.id,
      property_id,
      tenant_id,
      start_date,
      end_date: end_date || null,
      rent_amount: parseFloat(rent_amount),
      due_day: parseInt(due_day),
      readjustment_index,
      guarantee_type,
      status: 'ativo'
    })

  if (error) {
    console.error("Erro ao criar contrato:", error)
    redirect(`/dashboard/contracts/new?error=Erro ao salvar o contrato: ${error.message}`)
  }

  redirect('/dashboard/contracts?message=Contrato criado com sucesso')
}
