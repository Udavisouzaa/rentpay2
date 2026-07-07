'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function ToastContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<'success'|'error'>('success')

  useEffect(() => {
    const msg = searchParams?.get('message')
    const isSuccess = searchParams?.get('success') === 'true'
    const isError = searchParams?.get('error')

    if (msg || isSuccess || isError) {
      setMessage(msg || (isError ? String(isError) : 'Ação concluída com sucesso!'))
      setType(isError ? 'error' : 'success')
      setShow(true)

      // Remove as queries da URL para não aparecer novamente no refresh
      const newUrl = pathname
      window.history.replaceState({}, '', newUrl)

      // Esconde o toast após 4 segundos
      const timer = setTimeout(() => {
        setShow(false)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [searchParams, pathname])

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${
        type === 'success' 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/80 dark:border-emerald-700 dark:text-emerald-100'
          : 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/80 dark:border-orange-700 dark:text-orange-100'
      }`}>
        {type === 'success' ? (
          <div className="bg-emerald-100 dark:bg-emerald-800 rounded-full p-1">
            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="bg-orange-100 dark:bg-orange-800 rounded-full p-1">
            <svg className="w-4 h-4 text-orange-600 dark:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}

export function ToastProvider() {
  return (
    <Suspense fallback={null}>
      <ToastContent />
    </Suspense>
  )
}
