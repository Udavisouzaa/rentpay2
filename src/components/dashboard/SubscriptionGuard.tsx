'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Lock } from 'lucide-react'

// Plano gratuito: até 1 imóvel. Acima disso, é necessário assinatura ativa (ou em teste).
const FREE_PROPERTY_LIMIT = 1

export function SubscriptionGuard({ status, propertyCount, children }: { status: string, propertyCount: number, children: React.ReactNode }) {
  const pathname = usePathname()

  // Se está na tela de cobrança, sempre libera a renderização
  if (pathname === '/dashboard/billing') {
    return <>{children}</>
  }

  const isPaid = status === 'active' || status === 'trialing'

  // Só bloqueia o dashboard quando o usuário já ultrapassou o limite do plano gratuito
  // e não possui assinatura ativa. Isso libera a experiência inicial (cadastro do 1º imóvel)
  // sem exigir pagamento antecipado.
  const isBlocked = !isPaid && propertyCount > FREE_PROPERTY_LIMIT

  if (isBlocked) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] max-w-md mx-auto text-center space-y-6">
        <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-10 h-10 text-rose-500" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Limite do Plano Gratuito</h2>
          <p className="text-slate-500 dark:text-gray-400">
            O plano gratuito permite gerenciar {FREE_PROPERTY_LIMIT} imóvel. Para continuar administrando os demais, assine o Alugho Pro.
          </p>
        </div>
        <Link
          href="/dashboard/billing"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
        >
          Assinar Plano Pro
        </Link>
      </div>
    )
  }

  return <>{children}</>
}
