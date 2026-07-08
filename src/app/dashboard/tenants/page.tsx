import { createClient } from '@/utils/supabase/server'
import { TenantsList } from '@/components/dashboard/TenantsList'

export const revalidate = 0;

export default async function TenantsPage() {
  const supabase = await createClient()

  // Buscar inquilinos, seus imóveis e scores
  const { data: tenants, error } = await supabase
    .from('tenants')
    .select(`
      id,
      nome,
      properties (endereco),
      punctuality_scores (score_atual)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tenants:', error)
  }

  // Vamos buscar também faturas atrasadas para saber se o status atual é "On Time" ou "Late"
  const { data: lateInvoices } = await supabase
    .from('invoices')
    .select('tenant_id')
    .eq('status', 'atrasado')

  const lateTenantIds = new Set(lateInvoices?.map(i => i.tenant_id))

  const mappedTenants = (tenants || []).map(t => ({
    id: t.id,
    name: t.nome,
    propertyAddress: t.properties?.[0]?.endereco || 'Sem imóvel',
    paymentStatus: lateTenantIds.has(t.id) ? 'Late' : 'On Time' as 'Late' | 'On Time',
    score: t.punctuality_scores?.[0]?.score_atual ? Math.round(t.punctuality_scores[0].score_atual) : 100,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.id}&backgroundColor=b6e3f4`
  }))

  return <TenantsList tenants={mappedTenants} />
}
