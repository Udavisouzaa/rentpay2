import { createClient } from '@/utils/supabase/server'
import { MaintenanceKanban } from './MaintenanceKanban'

export const revalidate = 0;

export default async function DashboardMaintenancePage() {
  const supabase = await createClient()

  const { data: requests, error } = await supabase
    .from('maintenance_requests')
    .select(`
      *,
      properties (endereco),
      tenants (nome)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar chamados:', error)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white">Chamados de Manutenção</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Gerencie as solicitações de reparo dos seus inquilinos no formato Kanban. Arraste e solte os cards.
        </p>
      </div>

      <MaintenanceKanban initialItems={requests || []} />
    </div>
  )
}
