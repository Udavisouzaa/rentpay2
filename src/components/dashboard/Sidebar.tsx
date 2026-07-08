'use client'

import { Home, HomeIcon, Users, Wrench, LogOut, Building2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { href: '/dashboard', icon: Home, label: 'Visão Geral' },
    { href: '/dashboard/properties', icon: HomeIcon, label: 'Imóveis' },
    { href: '/dashboard/tenants', icon: Users, label: 'Inquilinos' },
    { href: '/dashboard/maintenance', icon: Wrench, label: 'Manutenção' },
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
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 flex-col z-20 shrink-0 hidden md:flex h-full">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Alugho</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all relative cursor-pointer ${
                  isActive ? 'text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-900/30' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className={`w-5 h-5 relative z-10 shrink-0 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 mt-auto space-y-4">
          <div className="bg-emerald-900 rounded-3xl p-6 text-white relative overflow-hidden hidden md:block">
            <div className="relative z-10 text-left">
              <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">Portal do Inquilino</p>
              <p className="text-xs leading-relaxed opacity-80">Acesso rápido para moradores.</p>
              <button onClick={copyTenantPortalLink} className="mt-3 w-full bg-white text-emerald-900 py-2 rounded-xl text-xs font-bold shadow-xl cursor-pointer hover:bg-slate-50 transition-colors">
                Copiar Link
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-700/50 rounded-full blur-2xl"></div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-slate-500 dark:text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-2xl transition-all cursor-pointer font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 flex items-center justify-around p-2 z-50 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[64px] ${
                isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-gray-300'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
