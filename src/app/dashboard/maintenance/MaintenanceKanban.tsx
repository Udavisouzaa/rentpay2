"use client"

import React, { useState, useTransition } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import { updateRequestStatus } from './actions'
import { MapPin, CheckCircle2 } from 'lucide-react'

type RequestItem = any

const COLUMNS = [
  { id: 'aberto', title: 'Abertos', emptyText: 'Nenhum chamado aberto.', color: 'border-l-rose-400', badgeColor: 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' },
  { id: 'andamento', title: 'Em Andamento', emptyText: 'Nenhum reparo em andamento.', color: 'border-l-amber-400', badgeColor: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  { id: 'resolvido', title: 'Resolvidos', emptyText: 'Sem histórico de chamados.', color: 'border-l-emerald-400', badgeColor: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400', icon: CheckCircle2 },
]

function Card({ req, isOverlay }: { req: RequestItem, isOverlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: req.id,
    data: { req },
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  const col = COLUMNS.find(c => c.id === req.status) || COLUMNS[0]

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white dark:bg-gray-800 p-5 rounded-3xl border-l-4 shadow-sm border border-slate-200 dark:border-gray-700 cursor-grab active:cursor-grabbing hover:shadow-md transition-all group ${col.color} ${isDragging ? 'opacity-50' : ''} ${req.status === 'resolvido' ? 'opacity-70 hover:opacity-100' : ''} ${isOverlay ? 'rotate-2 scale-105 shadow-xl' : ''}`}
    >
      <div className="flex justify-between items-start mb-2 pointer-events-none">
        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${col.badgeColor}`}>
          Chamado #{req.id.toString().padStart(3, '0')}
        </span>
        <span className="text-[10px] text-slate-400 dark:text-gray-500 font-medium">
          {new Date(req.created_at).toLocaleDateString('pt-BR')}
        </span>
      </div>
      
      <h4 className="font-bold text-slate-800 dark:text-white line-clamp-2 leading-tight pr-4 text-sm mb-3 mt-2 pointer-events-none">
        {req.descricao}
      </h4>
      
      <div className="space-y-2 pointer-events-none">
        <div className="flex items-center text-slate-500 dark:text-gray-400 text-xs">
          <MapPin className="w-3.5 h-3.5 mr-2 shrink-0 text-slate-400 dark:text-gray-500" />
          <span className="truncate font-medium">{req.properties?.endereco || 'Desconhecido'}</span>
        </div>
        <div className="flex items-center text-slate-500 dark:text-gray-400 text-xs mt-1">
          <span className="truncate font-medium ml-5 text-[10px]">De: {req.tenants?.nome || 'Desconhecido'}</span>
        </div>
      </div>

      {req.foto_url && (
        <div className="mt-3 block pointer-events-none">
          <div className="h-20 w-full rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden relative">
            <img src={req.foto_url} alt="Foto" className="object-cover w-full h-full opacity-80" />
          </div>
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-gray-700 pt-3 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 flex items-center justify-center font-bold text-xs text-slate-500">?</div>
          <span className="text-[10px] font-medium text-slate-500 dark:text-gray-400">Atribuir</span>
        </div>
        {col.icon && (
           <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
             <col.icon className="w-3.5 h-3.5" />
             Resolvido
           </div>
        )}
      </div>
    </div>
  )
}

function Column({ col, items }: { col: typeof COLUMNS[0], items: RequestItem[] }) {
  const { setNodeRef, isOver } = useDroppable({
    id: col.id,
  })

  return (
    <div className={`flex flex-col min-w-[300px] rounded-3xl p-2 transition-colors ${isOver ? 'bg-slate-50 dark:bg-gray-800/50' : ''}`}>
      <div className="flex items-center space-x-2 mb-4 px-2">
        <h3 className="font-bold text-slate-900 dark:text-white">{col.title}</h3>
        <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${col.badgeColor}`}>
          {items.length}
        </span>
      </div>

      <div ref={setNodeRef} className="flex flex-col gap-4 flex-1 min-h-[200px]">
        {items.length > 0 ? (
          items.map((req) => <Card key={req.id} req={req} />)
        ) : (
          <div className="flex-1 border-2 border-dashed border-slate-200 dark:border-gray-700 rounded-3xl flex items-center justify-center p-6 text-center text-sm text-slate-400 bg-transparent">
            {col.emptyText}
          </div>
        )}
      </div>
    </div>
  )
}

export function MaintenanceKanban({ initialItems }: { initialItems: RequestItem[] }) {
  const [items, setItems] = useState<RequestItem[]>(initialItems)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = async (event: any) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const cardId = active.id
    const newStatus = over.id
    
    const card = items.find((i) => i.id === cardId)
    if (!card || card.status === newStatus) return

    setItems((prev) => 
      prev.map((item) => 
        item.id === cardId ? { ...item, status: newStatus } : item
      )
    )

    startTransition(async () => {
      try {
        await updateRequestStatus(cardId, newStatus)
      } catch (err) {
        console.error('Erro ao mover card:', err)
        setItems(initialItems)
      }
    })
  }

  const activeItem = activeId ? items.find(i => i.id === activeId) : null

  return (
    <DndContext 
      sensors={sensors}
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[600px] relative">
        {COLUMNS.map((col) => (
          <Column 
            key={col.id}
            col={col}
            items={items.filter(i => i.status === col.id)}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.4' } } }) }}>
        {activeItem ? <Card req={activeItem} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}
