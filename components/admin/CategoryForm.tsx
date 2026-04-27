'use client'

import { useState, useTransition } from 'react'
import { upsertCategoria, deleteCategoria, toggleCategoriaActiva } from '@/lib/actions'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import type { Categoria, Modo } from '@/types'

interface CategoryManagerProps {
  categorias: Categoria[]
}

const MODO_LABELS: Record<Modo, string> = {
  resto: 'Restó',
  takeaway: 'Takeaway',
  vinos: 'Carta de Vinos',
  ambos: 'Restó + Takeaway',
}

const MODO_COLORS: Record<Modo, string> = {
  resto: 'bg-blue-500/20 text-blue-400',
  takeaway: 'bg-purple-500/20 text-purple-400',
  vinos: 'bg-rose-500/20 text-rose-400',
  ambos: 'bg-[var(--accent)]/20 text-[var(--accent)]',
}

export default function CategoryManager({ categorias }: CategoryManagerProps) {
  const [isPending, startTransition] = useTransition()
  const [editing, setEditing] = useState<Categoria | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    if (editing?.id) formData.set('id', editing.id)

    startTransition(async () => {
      const result = await upsertCategoria(formData)
      if (result.error) {
        setError(result.error)
      } else {
        setEditing(null)
        setShowNew(false)
      }
    })
  }

  const handleDelete = (id: string) => {
    setDeleteError(null)
    startTransition(async () => {
      const result = await deleteCategoria(id)
      if (result.error) {
        setDeleteError(result.error)
      } else {
        setConfirmDeleteId(null)
      }
    })
  }

  const handleToggle = (id: string, activa: boolean) => {
    startTransition(async () => {
      await toggleCategoriaActiva(id, !activa)
    })
  }

  const FormFields = ({ cat }: { cat?: Categoria }) => (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nombre *"
        name="nombre"
        defaultValue={cat?.nombre}
        placeholder="Ej: Rolls, Postres, Bebidas"
        required
      />
      <Input
        label="Orden (número)"
        name="orden"
        type="number"
        min="0"
        defaultValue={cat?.orden ?? categorias.length}
      />

      {/* Selector de modo */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-inter text-[var(--muted)]">Menú</label>
        <div className="grid grid-cols-2 gap-2">
          {(['resto', 'takeaway', 'vinos', 'ambos'] as Modo[]).map((m) => (
            <label
              key={m}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <input
                type="radio"
                name="modo"
                value={m}
                defaultChecked={(cat?.modo ?? 'resto') === m}
                className="sr-only peer"
              />
              <div className="w-full text-center border border-[var(--border)] rounded-lg py-2 px-1 text-xs font-inter text-[var(--muted)] peer-checked:border-[var(--accent)] peer-checked:text-[var(--accent)] peer-checked:bg-[var(--accent)]/10 transition-all cursor-pointer">
                {MODO_LABELS[m]}
              </div>
            </label>
          ))}
        </div>
      </div>

      <input type="hidden" name="activa" value={cat?.activa !== false ? 'true' : 'false'} />

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => { setEditing(null); setShowNew(false); setError(null) }}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button type="submit" loading={isPending} className="flex-1">
          {cat ? 'Guardar' : 'Crear categoría'}
        </Button>
      </div>
    </form>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bebas text-xl tracking-wide text-white">Categorías</h2>
        <Button size="sm" onClick={() => { setShowNew(true); setEditing(null) }}>
          + Nueva
        </Button>
      </div>

      {/* Lista */}
      <div className="divide-y divide-[var(--border)] border border-[var(--border)] rounded-xl overflow-hidden">
        {categorias.length === 0 && (
          <p className="text-[var(--muted)] text-sm font-inter py-4 px-4">
            No hay categorías aún.
          </p>
        )}
        {categorias.map((cat) => (
          <div key={cat.id} className="flex items-center gap-3 px-4 py-3 bg-[var(--surface)]">
            <div className="flex-1">
              <p className="text-sm font-inter font-medium text-white">{cat.nombre}</p>
              <p className="text-xs text-[var(--muted)]">Orden: {cat.orden}</p>
            </div>

            <span className={`text-xs font-inter px-2 py-0.5 rounded-full ${MODO_COLORS[cat.modo ?? 'resto']}`}>
              {MODO_LABELS[cat.modo ?? 'resto']}
            </span>

            <span
              className={`text-xs font-inter px-2 py-0.5 rounded-full ${
                cat.activa
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-[var(--border)] text-[var(--muted)]'
              }`}
            >
              {cat.activa ? 'Activa' : 'Oculta'}
            </span>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggle(cat.id, cat.activa)}
                disabled={isPending}
                aria-label={cat.activa ? 'Ocultar categoría' : 'Mostrar categoría'}
              >
                {cat.activa ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setEditing(cat); setShowNew(false) }}
                aria-label="Editar categoría"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setConfirmDeleteId(cat.id); setDeleteError(null) }}
                aria-label="Eliminar categoría"
                className="hover:text-red-400"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Form nueva categoría inline */}
      {showNew && (
        <div className="mt-4 border border-[var(--border)] rounded-xl p-4 bg-[var(--surface)]">
          <h3 className="font-bebas text-lg tracking-wide text-white mb-4">Nueva categoría</h3>
          <FormFields />
        </div>
      )}

      {/* Modal editar */}
      <Modal
        open={!!editing}
        onClose={() => { setEditing(null); setError(null) }}
        title="Editar categoría"
      >
        {editing && <FormFields cat={editing} />}
      </Modal>

      {/* Modal confirmar eliminar */}
      <Modal
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title="Eliminar categoría"
      >
        <p className="text-sm font-inter text-[var(--muted)] mb-2">
          ¿Confirmás que querés eliminar esta categoría?
        </p>
        <p className="text-xs text-[var(--muted)] mb-5">
          Solo se pueden eliminar categorías sin ítems.
        </p>
        {deleteError && (
          <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 mb-4">
            {deleteError}
          </p>
        )}
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
    </div>
  )
}
