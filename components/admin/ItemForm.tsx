'use client'

import { useState, useTransition } from 'react'
import { upsertItem } from '@/lib/actions'
import ImageUploader from './ImageUploader'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import type { Item, Categoria } from '@/types'

interface ItemFormProps {
  item?: Item
  categorias: Categoria[]
  onSuccess: () => void
  onCancel: () => void
}

export default function ItemForm({ item, categorias, onSuccess, onCancel }: ItemFormProps) {
  const [isPending, startTransition] = useTransition()
  const [imagenUrl, setImagenUrl] = useState<string>(item?.imagen_url ?? '')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.set('imagen_url', imagenUrl)
    if (item?.id) formData.set('id', item.id)

    startTransition(async () => {
      const result = await upsertItem(formData)
      if (result.error) {
        setError(result.error)
      } else {
        onSuccess()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex justify-center">
        <ImageUploader
          currentUrl={item?.imagen_url ?? null}
          onUpload={setImagenUrl}
        />
      </div>

      <Input
        label="Nombre del ítem *"
        id="nombre"
        name="nombre"
        defaultValue={item?.nombre}
        placeholder="Ej: Salmón Nigiri"
        required
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="descripcion" className="text-sm font-inter text-[var(--muted)]">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          defaultValue={item?.descripcion ?? ''}
          placeholder="Ingredientes o descripción breve"
          rows={2}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-white font-inter placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Precio (pesos) *"
          id="precio"
          name="precio"
          type="number"
          step="1"
          min="0"
          defaultValue={item ? item.precio / 100 : ''}
          placeholder="9500"
          required
        />
        <Input
          label="Orden"
          id="orden"
          name="orden"
          type="number"
          min="0"
          defaultValue={item?.orden ?? 0}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="categoria_id" className="text-sm font-inter text-[var(--muted)]">
          Categoría *
        </label>
        <select
          id="categoria_id"
          name="categoria_id"
          defaultValue={item?.categoria_id ?? ''}
          required
          className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-white font-inter outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
        >
          <option value="" disabled>Seleccioná una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="disponible"
          name="disponible"
          value="true"
          defaultChecked={item?.disponible ?? true}
          className="accent-[var(--accent)] w-4 h-4"
        />
        <label htmlFor="disponible" className="text-sm font-inter text-white">
          Disponible
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-2 pt-1">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" loading={isPending} className="flex-1">
          {item ? 'Guardar cambios' : 'Crear ítem'}
        </Button>
      </div>
    </form>
  )
}
