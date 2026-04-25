'use client'

import { useEffect, useRef } from 'react'
import type { Categoria } from '@/types'

interface CategoryNavProps {
  categorias: Categoria[]
  activeId: string
  onSelect: (id: string) => void
}

export default function CategoryNav({ categorias, activeId, onSelect }: CategoryNavProps) {
  const navRef = useRef<HTMLDivElement>(null)

  const handleClick = (id: string) => {
    onSelect(id)
    const el = document.getElementById(`cat-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Scroll el botón activo al centro de la nav
  useEffect(() => {
    if (!navRef.current) return
    const activeBtn = navRef.current.querySelector(`[data-id="${activeId}"]`) as HTMLElement
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeId])

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-20 flex gap-2 px-4 py-2.5 overflow-x-auto hide-scrollbar"
      style={{
        background: 'rgba(26, 26, 26, 0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border)',
      }}
      aria-label="Categorías del menú"
    >
      {categorias.map((cat) => {
        const isActive = cat.id === activeId
        return (
          <button
            key={cat.id}
            data-id={cat.id}
            onClick={() => handleClick(cat.id)}
            className={`
              flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-inter font-medium
              transition-all duration-150 active:scale-[0.97]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
              ${isActive
                ? 'bg-[var(--accent)] text-black'
                : 'text-[var(--muted)] hover:text-white border border-[var(--border)]'
              }
            `}
            aria-current={isActive ? 'true' : undefined}
          >
            {cat.nombre}
          </button>
        )
      })}
    </nav>
  )
}
