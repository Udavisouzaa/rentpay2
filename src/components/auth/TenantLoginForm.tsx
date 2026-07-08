"use client"

import { motion } from 'motion/react'
import { Building2, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function TenantLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const supabase = createClient()
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Login error:', error)
      setStatus('error')
      setErrorMessage('Credenciais inválidas.')
    } else {
      setStatus('success')
      router.push('/portal')
    }
  }

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
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-6">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Portal do Inquilino</h1>
          <p className="text-slate-500 text-sm font-medium mt-2 text-center">Acesse suas faturas e gerencie seu imóvel.</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">E-mail</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-slate-50 font-medium text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Senha</label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-slate-50 font-medium text-slate-900"
            />
          </div>
          
          {status === 'error' && (
            <div className="text-red-500 text-sm font-medium text-center">
              {errorMessage}
            </div>
          )}

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center group cursor-pointer mt-8"
          >
            {status === 'loading' ? 'Entrando...' : 'Acessar Portal'}
            {status !== 'loading' && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium mb-3">É proprietário?</p>
          <button 
            type="button"
            onClick={() => router.push('/login')}
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer w-full py-3 rounded-xl hover:bg-emerald-50"
          >
            Acessar Painel do Locador
          </button>
        </div>
      </motion.div>
    </div>
  )
}
