'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { deleteItem } from '@/lib/actions'
import { formatPrecio } from '@/lib/formatters'
import ToggleDisponible from './ToggleDisponible'
import Modal from '@/components/ui/Modal'
import ItemForm from './ItemForm'
import Button from '@/components/ui/Button'
import type { Item, Categoria } from '@/types'

interface ItemTableProps {
  items: Item[]
  categorias: Categoria[]
}

export default function ItemTable({ items, categorias }: ItemTableProps) {
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [isPending, startTransition] = useTransition()
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteItem(id)
      setConfirmDeleteId(null)
    })
  }

  if (items.length === 0) {
    return (
      <p className="text-[var(--muted)] text-sm font-inter py-4 text-center">
        No hay ítems en esta categoría.
      </p>
    )
  }

  return (
    <>
      <div className="divide-y divide-[var(--border)]">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-3">
            {/* Foto */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[var(--surface-hover)]">
              {item.imagen_url ? (
                <Image
                  src={item.imagen_url}
                  alt={item.nombre}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--muted)] text-xs">
                  —
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-inter font-medium text-white truncate">{item.nombre}</p>
              <p className="text-xs text-[var(--accent)] font-inter">{formatPrecio(item.precio)}</p>
            </div>

            {/* Toggle disponible */}
            <ToggleDisponible itemId={item.id} disponible={item.disponible} />

            {/* Acciones */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingItem(item)}
                aria-label="Editar ítem"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmDeleteId(item.id)}
                aria-label="Eliminar ítem"
                className="hover:text-red-400"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal editar */}
      <Modal
        open={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Editar ítem"
      >
        {editingItem && (
          <ItemForm
            item={editingItem}
            categorias={categorias}
            onSuccess={() => setEditingItem(null)}
            onCancel={() => setEditingItem(null)}
          />
        )}
      </Modal>

      {/* Modal confirmar eliminar */}
      <Modal
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title="Eliminar ítem"
      >
        <p className="text-sm font-inter text-[var(--muted)] mb-5">
          ¿Confirmás que querés eliminar este ítem? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setConfirmDeleteId(null)} className="flex-1">
            Cancelar
          </Button>
          <Button
            variant="danger"
            loading={isPending}
            onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}
            className="flex-1"
          >
            Eliminar
          </Button>
        </div>
      </Modal>
    </>
  )
}
