"use client"

import { motion } from 'motion/react'
import { Building2, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { login } from '@/app/login/actions'

export function LoginForm({ searchParams }: { searchParams?: { message?: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans text-slate-800">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[100px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-slate-100 relative z-10"
      >
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <img src="/logo.png" alt="Alugho" className="h-16 w-auto object-contain rounded-xl shadow-lg" />
          <p className="text-slate-500 text-sm font-medium mt-2 text-center">Gestão inteligente de aluguéis para locadores exigentes.</p>
        </div>

        <form className="space-y-6" action={login} onSubmit={() => setLoading(true)}>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">E-mail</label>
            <input 
              type="email"
              name="email"
              required
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-slate-50 font-medium text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Senha</label>
            <input 
              type="password"
              name="password"
              required
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-slate-50 font-medium text-slate-900"
            />
          </div>
          
          {searchParams?.message && (
            <div className="text-red-500 text-sm font-medium text-center">
              {searchParams.message}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center group cursor-pointer mt-8"
          >
            {loading ? 'Entrando...' : 'Entrar no Painel'}
            {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium mb-3">Acessando como morador?</p>
          <button 
            type="button"
            onClick={() => router.push('/portal/login')}
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer w-full py-3 rounded-xl hover:bg-emerald-50"
          >
            Acessar Portal do Inquilino
          </button>
        </div>
      </motion.div>
    </div>
  )
}
