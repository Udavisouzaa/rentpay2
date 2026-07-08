"use client"

import { motion } from 'motion/react'
import { CheckCircle2, CreditCard, AlertTriangle, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { createSubscriptionCheckout } from '@/app/dashboard/billing/actions'

interface SubscriptionData {
  status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'none'
  currentPeriodEnd: string | null
}

export function BillingOverview({ subscription }: { subscription: SubscriptionData }) {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const { url } = await createSubscriptionCheckout()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error(error)
      alert('Erro ao iniciar o pagamento. Tente novamente.')
      setLoading(false)
    }
  }

  const getStatusBadge = () => {
    switch (subscription.status) {
      case 'active':
        return <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Ativo</span>
      case 'trialing':
        return <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">Em Teste</span>
      case 'past_due':
        return <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Atrasado</span>
      case 'canceled':
      case 'none':
        return <span className="bg-slate-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">Inativo</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-8 flex-1 flex flex-col min-h-0">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Assinatura e Pagamento</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1 text-sm font-medium">Gerencie o seu plano do Alugho.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Status Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:w-[40%] bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-gray-700 flex flex-col"
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Status da Conta</h2>
            {getStatusBadge()}
          </div>
          
          <div className="mb-8">
            <p className="text-sm text-slate-500 dark:text-gray-400 font-medium mb-1">Seu Plano Atual</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Alugho Pro</h3>
          </div>

          <div className="bg-slate-50 dark:bg-gray-900/50 rounded-2xl p-5 border border-slate-100 dark:border-gray-700 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">Vencimento</span>
              <span className="text-sm font-black text-slate-900 dark:text-white">
                {subscription.currentPeriodEnd 
                  ? new Date(subscription.currentPeriodEnd).toLocaleDateString('pt-BR') 
                  : 'N/A'
                }
              </span>
            </div>
            {subscription.status === 'trialing' && (
               <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-2">
                 Você não será cobrado até o fim do teste grátis.
               </div>
            )}
            {subscription.status === 'past_due' && (
               <div className="text-[10px] text-rose-600 dark:text-rose-400 font-medium mt-2">
                 Sua assinatura está atrasada. Atualize o pagamento para evitar o bloqueio.
               </div>
            )}
          </div>

          {['active', 'trialing'].includes(subscription.status) ? (
            <button className="mt-auto w-full py-4 rounded-xl border-2 border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 font-bold hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors flex justify-center items-center">
              Gerenciar Assinatura
            </button>
          ) : (
            <div className="mt-auto text-center">
              <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">Seu acesso está restrito. Reative seu plano agora.</p>
            </div>
          )}
        </motion.div>

        {/* Pricing Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:w-[60%] bg-slate-900 rounded-[2rem] p-8 shadow-xl shadow-slate-900/10 text-white relative overflow-hidden flex flex-col"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 flex-1 flex flex-col">
            <h2 className="text-3xl font-black mb-2">Plano Pro</h2>
            <p className="text-slate-400 text-sm font-medium mb-8 max-w-sm">Tudo o que você precisa para escalar sua gestão de imóveis sem dor de cabeça.</p>

            <div className="mb-10">
              <span className="text-5xl font-black tracking-tight">R$ 97</span>
              <span className="text-slate-400 font-bold">/mês</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-10 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0"><CheckCircle2 className="w-4 h-4"/></div>
                <span className="text-sm font-medium text-slate-300">Imóveis ilimitados</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0"><CheckCircle2 className="w-4 h-4"/></div>
                <span className="text-sm font-medium text-slate-300">Cobranças via Pix/Boleto</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0"><CheckCircle2 className="w-4 h-4"/></div>
                <span className="text-sm font-medium text-slate-300">Avisos automáticos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0"><CheckCircle2 className="w-4 h-4"/></div>
                <span className="text-sm font-medium text-slate-300">Portal do Inquilino</span>
              </div>
            </div>

            {['active', 'trialing'].includes(subscription.status) ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg"><CheckCircle2 className="w-5 h-5 text-white" /></div>
                  <div>
                    <p className="font-bold text-white text-sm">Plano Ativo</p>
                    <p className="text-emerald-300 text-xs font-medium">Obrigado por confiar no Alugho!</p>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center group cursor-pointer"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {loading ? 'Redirecionando...' : 'Assinar Plano Pro Agora'}
                {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
