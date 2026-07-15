export function Card({
  children,
  className = '',
  as: Component = 'div',
  accent = false,
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  /** Aplica a barra de destaque lateral (assinatura visual dos cards) */
  accent?: boolean
}) {
  return (
    <Component
      className={`bg-[var(--color-surface)] dark:bg-gray-800 rounded-2xl border-2 ${
        accent ? 'border-[var(--color-accent)]/40 border-l-[6px] border-l-[var(--color-accent)]' : 'border-[var(--color-border-subtle)] dark:border-gray-700'
      } shadow-[var(--shadow-sm)] transition-colors ${className}`}
    >
      {children}
    </Component>
  )
}
