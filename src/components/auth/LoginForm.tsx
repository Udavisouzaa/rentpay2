"use client"

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { login } from '@/app/login/actions'

export function LoginForm({ searchParams }: { searchParams?: { message?: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center p-4 relative overflow-hidden font-sans text-slate-800">
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-[var(--color-accent)]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-[var(--color-primary-dark)]/60 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-12 rounded-2xl shadow-[var(--shadow-lg)] border-2 border-white/10 relative z-10"
      >
        <div className="flex flex-col items-center justify-center space-y-5 mb-10">
          <img src="/logo.png" alt="Alugho" className="h-16 w-auto object-contain rounded-xl shadow-[var(--shadow-md)]" />
          <p className="text-slate-500 text-sm font-medium mt-1 text-center">Gestão inteligente de aluguéis para locadores exigentes.</p>
        </div>

        <form className="space-y-7" action={login} onSubmit={() => setLoading(true)}>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] mb-2">E-mail</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-4 rounded-xl border-2 border-[var(--color-border-subtle)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/15 outline-none transition-all bg-[var(--background)] font-medium text-slate-900"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] mb-2">Senha</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-4 rounded-xl border-2 border-[var(--color-border-subtle)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/15 outline-none transition-all bg-[var(--background)] font-medium text-slate-900"
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
            className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] disabled:opacity-50 text-white font-black py-4 rounded-xl shadow-[var(--shadow-glow-accent)] transition-all flex items-center justify-center group cursor-pointer mt-8"
          >
            {loading ? 'Entrando...' : 'Entrar no Painel'}
            {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 pt-7 border-t-2 border-[var(--color-border-subtle)] text-center">
          <p className="text-xs text-slate-400 font-medium mb-3">Acessando como morador?</p>
          <button
            type="button"
            onClick={() => router.push('/portal/login')}
            className="text-sm font-black text-[var(--color-primary)] hover:text-[var(--color-accent-dark)] transition-colors cursor-pointer w-full py-3 rounded-xl hover:bg-[var(--color-accent-soft)]"
          >
            Acessar Portal do Inquilino
          </button>
        </div>
      </motion.div>
    </div>
  )
}
