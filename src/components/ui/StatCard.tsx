"use client"

import { motion } from 'motion/react'
import { Card } from './Card'

interface StatCardProps {
  title: string
  value: string
  trend: string
  isPositive: boolean
  delay?: number
  children?: React.ReactNode
}

export function StatCard({ title, value, trend, isPositive, delay = 0, children }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: 'easeOut' }}
    >
      <Card accent className="p-8 flex flex-col gap-2">
        <span className="text-slate-400 dark:text-gray-400 text-[11px] font-black uppercase tracking-widest">{title}</span>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-4xl font-black text-[var(--color-primary)] dark:text-white tracking-tight">{value}</span>
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
              isPositive
                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
            }`}
          >
            {trend}
          </span>
        </div>
        {children}
      </Card>
    </motion.div>
  )
}
