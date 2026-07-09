import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { TenantPortalOverview } from '@/components/portal/TenantPortalOverview'

export const revalidate = 0; // Opt out of caching

export default async function TenantPortalPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/portal/login')
  }

  // Buscar inquilino e as propriedades via RLS
  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .select(`
      id, nome,
      properties (endereco)
    `)
    .single()

  if (tenantError || !tenant) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900">Acesso Negado</h2>
        <p className="mt-2 text-gray-500">
          Seu e-mail não está vinculado a nenhum contrato de aluguel ativo.
        </p>
      </div>
    )
  }

  // Buscar faturas do inquilino
  const { data: invoices } = await supabase
    .from('invoices')
    .select('*')
    .eq('tenant_id', tenant.id)
    .order('created_at', { ascending: false })

  const currentInvoiceData = invoices?.find(inv => inv.status === 'pendente' || inv.status === 'atrasado')

  const currentInvoice = currentInvoiceData ? {
    amount: Number(currentInvoiceData.valor),
    dueDate: new Date(currentInvoiceData.data_vencimento).toLocaleDateString('pt-BR'),
    status: currentInvoiceData.status === 'atrasado' ? 'Late' : 'Pending' as 'Late' | 'Pending',
    paymentLink: currentInvoiceData.payment_link
  } : null

  const tenantData = {
    name: tenant.nome,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    propertyAddress: Array.isArray(tenant.properties) ? tenant.properties[0]?.endereco : (tenant.properties as any)?.endereco || 'Desconhecido',
    ownerName: 'Administrador Alugho' // Poderíamos buscar o owner_id se tivéssemos a relação na tabela.
  }

  return <TenantPortalOverview tenant={tenantData} currentInvoice={currentInvoice} />
}
