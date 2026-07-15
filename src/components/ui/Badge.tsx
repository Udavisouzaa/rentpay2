type BadgeTone = 'emerald' | 'rose' | 'amber' | 'slate'

const toneClasses: Record<BadgeTone, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
  rose: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800',
  amber: 'bg-[var(--color-accent-soft)] text-[var(--color-accent-dark)] border-[var(--color-accent)]/40 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  slate: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
}

export function Badge({
  tone = 'slate',
  children,
  className = '',
}: {
  tone?: BadgeTone
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-lg border-2 text-[10px] font-black uppercase tracking-widest ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
