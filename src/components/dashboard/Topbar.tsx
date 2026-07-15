'use client'

import { Bell, Search, Building2 } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { UserDropdown } from '@/components/UserDropdown'

export function Topbar({ name, initials }: { name: string, initials: string }) {
  return (
    <header className="h-20 md:h-24 bg-[var(--background)]/95 dark:bg-gray-900/95 backdrop-blur-md border-b-2 border-[var(--color-border-subtle)] dark:border-gray-700 px-4 md:px-12 flex items-center justify-between sticky top-0 z-10 shrink-0 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center md:hidden">
          <img src="/logo.png" alt="Alugho" className="h-8 w-auto object-contain rounded-lg" />
        </div>
        <div className="hidden md:flex items-center bg-white dark:bg-gray-800 rounded-xl px-5 py-3 w-96 border-2 border-[var(--color-border-subtle)] dark:border-gray-600 focus-within:border-[var(--color-accent)] transition-colors">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Buscar imóveis, inquilinos..."
            className="bg-transparent border-none outline-none ml-3 w-full text-sm font-medium placeholder:text-slate-400 text-slate-700 dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-7">
        <ThemeToggle />
        <div className="relative">
          <button onClick={() => alert('Você não tem novas notificações no momento.')} className="w-11 h-11 bg-white dark:bg-gray-800 hover:bg-[var(--color-accent-soft)] dark:hover:bg-gray-700 rounded-xl flex items-center justify-center border-2 border-[var(--color-border-subtle)] dark:border-gray-600 transition-colors cursor-pointer group">
            <Bell className="w-4 h-4 text-slate-500 dark:text-gray-400 group-hover:text-[var(--color-accent-dark)] dark:group-hover:text-white" />
          </button>
          <span className="absolute top-0 right-0 w-3 h-3 bg-[var(--color-accent)] border-2 border-[var(--background)] dark:border-gray-900 rounded-full"></span>
        </div>
        <div className="flex items-center gap-3 pl-5 md:pl-7 border-l-2 border-[var(--color-border-subtle)] dark:border-gray-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black leading-none text-[var(--color-primary)] dark:text-white">{name}</p>
            <p className="text-[10px] font-bold text-[var(--color-accent-dark)] mt-1 uppercase tracking-wider">Locador Pro</p>
          </div>
          <div className="shrink-0">
            <UserDropdown name={name} initials={initials} />
          </div>
        </div>
      </div>
    </header>
  )
}
