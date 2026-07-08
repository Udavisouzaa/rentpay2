import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Topbar } from '@/components/dashboard/Topbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const name = user.user_metadata?.full_name || 'Locador'
  const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-gray-900 text-slate-800 font-sans overflow-hidden transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative pb-16 md:pb-0">
        <Topbar name={name} initials={initials} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-10">
          <div className="mx-auto flex flex-col gap-8 min-h-full md:h-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
