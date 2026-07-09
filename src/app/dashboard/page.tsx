import { createClient } from '@/utils/supabase/server'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'

export const revalidate = 0;

export default async function DashboardPage() {
  const supabase = await createClient()

  // Buscar propriedades
  const { data: properties } = await supabase
    .from('properties')
    .select('*, tenants(id)')

  const totalImoveis = properties?.length || 0
  const imoveisOcupados = properties?.filter(p => p.status === 'ocupado').length || 0
  const taxaOcupacao = totalImoveis > 0 ? Math.round((imoveisOcupados / totalImoveis) * 100) : 0

  // Buscar faturas para calcular receita do mês e inadimplência
  const { data: invoices } = await supabase
    .from('invoices')
    .select(`
      id, valor, status, data_vencimento, data_pagamento,
      tenants (nome)
    `)
    .order('data_vencimento', { ascending: true })

  let recebidoNoMes = 0
  let emAtrasoCount = 0
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pendingInvoices: any[] = []

  if (invoices) {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoices.forEach((inv: any) => {
      if (inv.status === 'atrasado') {
        emAtrasoCount++
      }
      if (inv.status === 'pago' && inv.data_pagamento) {
        const pagDate = new Date(inv.data_pagamento)
        if (pagDate.getUTCMonth() === currentMonth && pagDate.getUTCFullYear() === currentYear) {
          recebidoNoMes += (Number(inv.valor) || 0)
        }
      }
      if (inv.status !== 'pago') {
        pendingInvoices.push({
          id: inv.id,
          tenantName: inv.tenants?.nome || 'Desconhecido',
          dueDate: new Date(inv.data_vencimento).toLocaleDateString('pt-BR'),
          amount: Number(inv.valor),
          status: inv.status === 'atrasado' ? 'Late' : 'Pending'
        })
      }
    })
  }

  const activeTenants = imoveisOcupados
  const inadimplencia = invoices && invoices.length > 0 
    ? Math.round((emAtrasoCount / invoices.length) * 100) 
    : 0

  const stats = [
    { 
      title: 'Receita do Mês', 
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(recebidoNoMes), 
      trend: recebidoNoMes > 0 ? '+12%' : 'R$ 0', 
      isPositive: true 
    },
    { 
      title: 'Taxa de Ocupação', 
      value: `${taxaOcupacao}%`, 
      trend: taxaOcupacao >= 80 ? 'Alta' : 'Estável', 
      isPositive: taxaOcupacao >= 80 
    },
    { 
      title: 'Inquilinos Ativos', 
      value: String(activeTenants), 
      trend: `/${totalImoveis} vagas`, 
      isPositive: true 
    },
    { 
      title: 'Inadimplência', 
      value: `${inadimplencia}%`, 
      trend: inadimplencia > 10 ? 'Atenção' : 'Saudável', 
      isPositive: inadimplencia <= 10 
    },
  ]

  return <DashboardOverview stats={stats} invoices={pendingInvoices.slice(0, 5)} />
}
