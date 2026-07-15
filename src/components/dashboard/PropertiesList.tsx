"use client"

import { motion } from 'motion/react'
import { MapPin, MoreVertical, Plus } from 'lucide-react'
import Link from 'next/link'

interface Property {
  id: string
  address: string
  price: number
  status: 'Rented' | 'Vacant'
  image: string
}

export function PropertiesList({ properties }: { properties: Property[] }) {
  return (
    <div className="space-y-10 flex-1 flex flex-col min-h-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-primary)] dark:text-white tracking-tight">Imóveis</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-3 text-base font-medium">Gerencie seu portfólio de propriedades.</p>
        </div>
        <Link
          href="/dashboard/properties/new"
          className="w-full sm:w-auto justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white px-6 py-3.5 rounded-xl font-black text-sm shadow-[var(--shadow-glow-accent)] transition-all flex items-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Imóvel
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto pb-8">
        {properties.map((property, i) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="bg-[var(--color-surface)] dark:bg-gray-800 rounded-2xl overflow-hidden border-2 border-[var(--color-border-subtle)] dark:border-gray-700 shadow-[var(--shadow-sm)] group hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-lg)] transition-all cursor-pointer flex flex-col relative"
          >
            <Link href={`/dashboard/properties/${property.id}`} className="absolute inset-0 z-10" aria-label={`Ver detalhes de ${property.address}`} />
            
            <div className="h-56 relative overflow-hidden">
              <img 
                src={property.image} 
                alt={property.address} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm border border-white/20 ${
                  property.status === 'Rented'
                    ? 'bg-[var(--color-primary)]/90 text-white'
                    : 'bg-white/90 dark:bg-gray-900/90 text-slate-900 dark:text-white'
                }`}>
                  {property.status === 'Rented' ? 'Alugado' : 'Vago'}
                </span>
              </div>
              <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition-colors opacity-0 group-hover:opacity-100 cursor-pointer z-20">
                <MoreVertical className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div className="flex items-start space-x-2 mb-8">
                <MapPin className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                <h3 className="text-slate-800 dark:text-white font-bold leading-snug">{property.address}</h3>
              </div>

              <div className="flex items-center justify-between pt-5 border-t-2 border-[var(--color-border-subtle)] dark:border-gray-700">
                <p className="text-slate-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-wider">Valor Mensal</p>
                <p className="text-2xl font-black text-[var(--color-primary)] dark:text-[var(--color-accent)]">R$ {property.price.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {properties.length === 0 && (
          <div className="col-span-full py-20 text-center flex flex-col items-center">
             <div className="w-16 h-16 bg-slate-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
               <MapPin className="w-8 h-8 text-slate-300 dark:text-gray-600" />
             </div>
             <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nenhum imóvel cadastrado</h3>
             <p className="text-slate-500 dark:text-gray-400 mt-2 max-w-sm">Comece a gerenciar seu portfólio adicionando seu primeiro imóvel.</p>
          </div>
        )}
      </div>
    </div>
  )
}
