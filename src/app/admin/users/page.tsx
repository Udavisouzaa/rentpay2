import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Users, Search, MoreVertical } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  const supabase = createClient()
  
  // No MVP, pegamos todos os proprietários da tabela 'properties' usando group by ou join
  // Mas como a Auth users não expõe email no select normal, para o admin painel funcionar 100%
  // Precisaria usar a supabase_admin key. Vamos mockar a lista de usuários baseada nos 
  // locadores reais caso a policy permita, ou mostrar um mock.
  
  // Vamos tentar buscar as propriedades para deduzir usuários ativos
  const { data: properties } = await supabase
    .from('properties')
    .select('owner_id')
    
  // Contar imóveis por owner_id
  const ownerCounts: Record<string, number> = {}
  if (properties) {
    properties.forEach(p => {
      ownerCounts[p.owner_id] = (ownerCounts[p.owner_id] || 0) + 1
    })
  }
  
  const activeOwnersCount = Object.keys(ownerCounts).length

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Locadores</h1>
          <p className="text-slate-500 mt-1">Gerencie os proprietários cadastrados na plataforma.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="Buscar por e-mail ou nome..."
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-700">Todos os Locadores ({activeOwnersCount} detectados)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Locador</th>
                <th className="p-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Imóveis</th>
                <th className="p-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Plano</th>
                <th className="p-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.keys(ownerCounts).map((ownerId, index) => (
                <tr key={ownerId} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
                        {ownerId.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Locador {ownerId.substring(0, 6)}...</div>
                        <div className="text-xs text-slate-500">ID: {ownerId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 px-6 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-sm">
                      {ownerCounts[ownerId]}
                    </span>
                  </td>
                  <td className="p-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Controle
                    </span>
                  </td>
                  <td className="p-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      Ativo
                    </span>
                  </td>
                  <td className="p-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {Object.keys(ownerCounts).length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    Nenhum locador encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
