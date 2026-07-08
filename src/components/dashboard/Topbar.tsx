import { Bell, Search, Building2 } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { UserDropdown } from '@/components/UserDropdown'

export function Topbar({ name, initials }: { name: string, initials: string }) {
  return (
    <header className="h-16 md:h-20 bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 px-4 md:px-10 flex items-center justify-between sticky top-0 z-10 shrink-0 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Alugho</span>
        </div>
        <div className="hidden md:flex items-center bg-slate-50 dark:bg-gray-700 rounded-2xl px-4 py-2.5 w-96 border border-slate-200 dark:border-gray-600">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Buscar imóveis, inquilinos..." 
            className="bg-transparent border-none outline-none ml-3 w-full text-sm font-medium placeholder:text-slate-400 text-slate-700 dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <ThemeToggle />
        <div className="relative">
          <button className="w-10 h-10 bg-slate-50 dark:bg-gray-700 hover:bg-slate-100 dark:hover:bg-gray-600 rounded-full flex items-center justify-center border border-slate-200 dark:border-gray-600 transition-colors cursor-pointer group">
            <Bell className="w-4 h-4 text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-white" />
          </button>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
        <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-slate-200 dark:border-gray-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">{name}</p>
            <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Locador Pro</p>
          </div>
          <div className="shrink-0">
            <UserDropdown name={name} initials={initials} />
          </div>
        </div>
      </div>
    </header>
  )
}
