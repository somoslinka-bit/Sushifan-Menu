'use client'

import { useState, useEffect, useCallback } from 'react'
import CategoryNav from './CategoryNav'
import CategorySection from './CategorySection'
import TakeawayCart from './TakeawayCart'
import type { Categoria, Item } from '@/types'

interface MenuPageProps {
  categorias: Categoria[]
  itemsPorCategoria: Record<string, Item[]>
  modo: string
}

export default function MenuPage({ categorias, itemsPorCategoria, modo }: MenuPageProps) {
  const [activeId, setActiveId] = useState(categorias[0]?.id ?? '')
  const [cart, setCart] = useState<Record<string, number>>({})

  const esTakeaway = modo === 'takeaway'
  const allItems = Object.values(itemsPorCategoria).flat()

  const handleScroll = useCallback(() => {
    const sections = categorias
      .map((cat) => document.getElementById(`cat-${cat.id}`))
      .filter(Boolean) as HTMLElement[]

    const scrollY = window.scrollY + 120

    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= scrollY) {
        setActiveId(categorias[i].id)
        break
      }
    }
  }, [categorias])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleAdd = useCallback((item: Item) => {
    setCart((prev) => ({ ...prev, [item.id]: (prev[item.id] ?? 0) + 1 }))
  }, [])

  const handleRemove = useCallback((itemId: string) => {
    setCart((prev) => {
      const next = { ...prev }
      if ((next[itemId] ?? 0) <= 1) {
        delete next[itemId]
      } else {
        next[itemId] -= 1
      }
      return next
    })
  }, [])

  const handleClear = useCallback(() => {
    setCart({})
  }, [])

  const cartProps = esTakeaway
    ? { cart, onAdd: handleAdd, onRemove: handleRemove }
    : undefined

  return (
    <div>
      <CategoryNav
        categorias={categorias}
        activeId={activeId}
        onSelect={setActiveId}
      />
      <main>
        {categorias.map((cat) => (
          <CategorySection
            key={cat.id}
            categoria={cat}
            items={itemsPorCategoria[cat.id] ?? []}
            cartProps={cartProps}
          />
        ))}
        {/* Espacio para que el botón flotante no tape el último ítem */}
        <div className={esTakeaway ? 'h-28' : 'h-16'} />
      </main>

      {esTakeaway && (
        <TakeawayCart cart={cart} items={allItems} onClear={handleClear} />
      )}
    </div>
  )
}
