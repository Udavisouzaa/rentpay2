import { createClient } from '@/utils/supabase/server'
import { CheckCircle2, MessageSquare, Clock, AlertCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function WhatsappLogsPage() {
  const supabase = await createClient()
  
  // Simulando logs do motor de comunicação do WhatsApp (MVP)
  const logs = [
    {
      id: 1,
      tenant: "Carlos Henrique",
      property: "Apto 302 - Centro",
      type: "D-3 Lembrete",
      message: "Olá Carlos! Passando para lembrar que seu aluguel vence em 3 dias.",
      status: "enviado",
      time: "Há 2 horas"
    },
    {
      id: 2,
      tenant: "Mariana Souza",
      property: "Casa 4 - Vila Nova",
      type: "D0 Cobrança",
      message: "Bom dia Mariana! Segue o link Pix para pagamento do seu aluguel de hoje: pix.link/123",
      status: "enviado",
      time: "Hoje, 08:30"
    },
    {
      id: 3,
      tenant: "Roberto Alves",
      property: "Apto 101 - Trindade",
      type: "D+1 Atraso",
      message: "Olá Roberto, não identificamos o pagamento do aluguel de ontem. Podemos ajudar?",
      status: "falha",
      time: "Ontem, 09:00"
    },
    {
      id: 4,
      tenant: "Juliana Costa",
      property: "Sala Comercial - Centro",
      type: "Confirmação",
      message: "Pagamento recebido com sucesso! Obrigado pela pontualidade. Seu score Alugho subiu! 🚀",
      status: "enviado",
      time: "Ontem, 14:15"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Console de Disparos WhatsApp</h1>
        <p className="text-slate-500 mt-1">Acompanhe as mensagens automáticas enviadas pelo motor da Alugho (Ambiente Simulado).</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-bold mb-1">Disparos Hoje</div>
          <div className="text-2xl font-black text-slate-900">142</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-emerald-600 text-sm font-bold mb-1">Taxa de Entrega</div>
          <div className="text-2xl font-black text-emerald-700">98.5%</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-blue-600 text-sm font-bold mb-1">Respostas Inquilinos</div>
          <div className="text-2xl font-black text-blue-700">12</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-700">Últimas Mensagens (Log Real-time)</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {logs.map((log) => (
            <div key={log.id} className="p-6 flex flex-col sm:flex-row gap-4 sm:items-center hover:bg-slate-50 transition-colors">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                    {log.type}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{log.tenant}</span>
                  <span className="text-xs text-slate-500 hidden sm:inline-block">({log.property})</span>
                </div>
                <div className="text-sm text-slate-600 bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-100 inline-block mt-2">
                  <MessageSquare className="w-4 h-4 inline-block mr-2 opacity-50" />
                  "{log.message}"
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 min-w-[120px]">
                {log.status === 'enviado' ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" /> Enviado
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
                    <AlertCircle className="w-4 h-4" /> Falha
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5" /> {log.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
