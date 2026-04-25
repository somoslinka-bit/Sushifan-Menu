'use client'

import { useState, useEffect, useCallback } from 'react'
import CategoryNav from './CategoryNav'
import CategorySection from './CategorySection'
import type { Categoria, Item } from '@/types'

interface MenuPageProps {
  categorias: Categoria[]
  itemsPorCategoria: Record<string, Item[]>
}

export default function MenuPage({ categorias, itemsPorCategoria }: MenuPageProps) {
  const [activeId, setActiveId] = useState(categorias[0]?.id ?? '')

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
          />
        ))}
        <div className="h-16" />
      </main>
    </div>
  )
}
