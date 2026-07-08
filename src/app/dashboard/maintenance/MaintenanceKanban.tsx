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

type RequestItem = any // Using any for simplicity as it matches the original component

const COLUMNS = [
  { id: 'aberto', title: 'Abertos', emptyText: 'Nenhum chamado aberto.' },
  { id: 'andamento', title: 'Em Andamento', emptyText: 'Nenhum reparo em andamento.' },
  { id: 'resolvido', title: 'Resolvidos', emptyText: 'Sem histórico de chamados.' },
]

function getStatusColor(status: string) {
  switch (status) {
    case 'aberto': return 'bg-orange-50 text-orange-700'
    case 'andamento': return 'bg-amber-50 text-amber-700'
    case 'resolvido': return 'bg-emerald-50 text-emerald-700'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'aberto': return 'Aberto'
    case 'andamento': return 'Em Andamento'
    case 'resolvido': return 'Resolvido'
    default: return status
  }
}

function Card({ req, isOverlay }: { req: RequestItem, isOverlay?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: req.id,
    data: { req },
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''} ${isOverlay ? 'rotate-2 scale-105 shadow-xl' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(req.status)}`}>
          {getStatusText(req.status)}
        </span>
        <span className="text-[10px] text-gray-400 font-medium">
          {new Date(req.created_at).toLocaleDateString('pt-BR')}
        </span>
      </div>
      
      <p className="text-sm font-medium text-gray-900 dark:text-white mb-0.5 pointer-events-none">
        {req.tenants?.nome || 'Desconhecido'}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 truncate pointer-events-none">
        {req.properties?.endereco || 'Desconhecido'}
      </p>

      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-3 bg-gray-50 dark:bg-gray-900/50 p-2 rounded text-xs pointer-events-none">
        {req.descricao}
      </p>

      {req.foto_url && (
        <div className="block mb-1 pointer-events-none">
          <div className="h-24 w-full rounded border border-gray-200 dark:border-gray-600 overflow-hidden relative group-hover:border-teal-500 transition-colors">
            <img src={req.foto_url} alt="Foto" className="object-cover w-full h-full" />
          </div>
        </div>
      )}
    </div>
  )
}

function Column({ id, title, emptyText, items }: { id: string, title: string, emptyText: string, items: RequestItem[] }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div className={`flex flex-col rounded-xl border p-4 h-full transition-colors ${isOver ? 'bg-teal-50/50 border-teal-200 dark:bg-teal-900/20 dark:border-teal-800' : 'bg-gray-50/50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
        <span className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600">
          {items.length}
        </span>
      </div>

      <div ref={setNodeRef} className="flex flex-col gap-3 flex-1 min-h-[150px]">
        {items.length > 0 ? (
          items.map((req) => <Card key={req.id} req={req} />)
        ) : (
          <div className="flex-1 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center p-6 text-center text-sm text-gray-400 dark:text-gray-500 bg-transparent">
            {emptyText}
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
        distance: 5, // Requires 5px movement before drag starts, allows clicking inner elements if needed
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

    // Optimistic Update
    setItems((prev) => 
      prev.map((item) => 
        item.id === cardId ? { ...item, status: newStatus } : item
      )
    )

    // Background Server Action
    startTransition(async () => {
      try {
        await updateRequestStatus(cardId, newStatus)
      } catch (err) {
        console.error('Erro ao mover card:', err)
        // Revert on error
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
            id={col.id}
            title={col.title}
            emptyText={col.emptyText}
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
