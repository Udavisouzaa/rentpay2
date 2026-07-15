'use client'

import { Home, HomeIcon, Users, Wrench, LogOut, Building2, CreditCard, FileText, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { href: '/dashboard', icon: Home, label: 'Visão Geral' },
    { href: '/dashboard/properties', icon: HomeIcon, label: 'Imóveis' },
    { href: '/dashboard/contracts', icon: FileText, label: 'Contratos' },
    { href: '/dashboard/tenants', icon: Users, label: 'Inquilinos' },
    { href: '/dashboard/maintenance', icon: Wrench, label: 'Manutenção' },
    { href: '/dashboard/billing', icon: CreditCard, label: 'Assinatura' },
  ]

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const copyTenantPortalLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/portal`)
    alert('Link do portal copiado!')
  }

  return (
    <>
      <aside className="w-72 bg-[var(--color-sidebar-bg)] border-r border-[var(--color-sidebar-border)] flex-col z-20 shrink-0 hidden md:flex h-full">
        <div className="px-8 pt-10 pb-6">
          <div className="flex items-center justify-center py-6 bg-white/5 rounded-2xl border border-white/10">
            <img src="/logo.png" alt="Alugho" className="h-12 w-auto object-contain rounded-xl" />
          </div>
        </div>

        <nav className="flex-1 px-5 space-y-2 mt-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 pl-4 pr-4 py-3.5 rounded-xl transition-all relative cursor-pointer border-l-4 ${
                  isActive
                    ? 'text-[var(--color-sidebar-text-active)] font-bold bg-white/10 border-[var(--color-accent)]'
                    : 'text-[var(--color-sidebar-text)] border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 relative z-10 shrink-0 ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-sidebar-text)]'}`} />
                <span className="relative z-10 text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-5 mt-auto space-y-4">
          <div className="bg-[var(--color-accent-soft)] rounded-2xl p-6 border-2 border-[var(--color-accent)]/30 text-[var(--color-accent-dark)] relative overflow-hidden hidden md:block group">
            <div className="relative z-10 text-left">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-[var(--color-accent)]" />
                <p className="text-[10px] font-black text-[var(--color-accent)] uppercase tracking-widest">Precisa de Ajuda?</p>
              </div>
              <p className="text-xs leading-relaxed opacity-80 mb-4">Fale com nosso time de especialistas no WhatsApp.</p>
              <a
                href="https://wa.me/5548992084726?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20meu%20painel%20Alugho!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[var(--color-accent)] text-white py-3 rounded-xl text-xs font-black shadow-[var(--shadow-glow-accent)] cursor-pointer hover:bg-[var(--color-accent-dark)] transition-colors"
              >
                Chamar Suporte
              </a>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3.5 text-[var(--color-sidebar-text)] hover:text-rose-400 hover:bg-white/5 rounded-xl transition-all cursor-pointer font-bold text-sm border border-white/10"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-sidebar-bg)] border-t border-[var(--color-sidebar-border)] flex items-center justify-around p-2 z-50 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[64px] ${
                isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-sidebar-text)] hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-sidebar-text)]'}`} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
