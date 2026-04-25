'use client'

import { useState, useTransition } from 'react'
import { toggleDisponible } from '@/lib/actions'

interface ToggleDisponibleProps {
  itemId: string
  disponible: boolean
}

export default function ToggleDisponible({ itemId, disponible: initialDisponible }: ToggleDisponibleProps) {
  const [disponible, setDisponible] = useState(initialDisponible)
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    const next = !disponible
    setDisponible(next)
    startTransition(async () => {
      const result = await toggleDisponible(itemId, next)
      if (result.error) setDisponible(!next)
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`
        relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full
        transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
        disabled:opacity-50
        ${disponible ? 'bg-green-500' : 'bg-[var(--border)]'}
      `}
      aria-label={disponible ? 'Marcar como agotado' : 'Marcar como disponible'}
      title={disponible ? 'Disponible — clic para agotar' : 'Agotado — clic para activar'}
    >
      <span
        className={`
          inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5
          ${disponible ? 'translate-x-4' : 'translate-x-0.5'}
        `}
      />
    </button>
  )
}
