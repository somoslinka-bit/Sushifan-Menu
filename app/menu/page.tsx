import { getCategorias, getItems } from '@/lib/queries'
import MenuPage from '@/components/menu/MenuPage'
import type { Metadata } from 'next'
import type { Item } from '@/types'

export const metadata: Metadata = {
  title: 'SushiFan | Menú',
  description: 'Menú digital SushiFan wine bar — Tandil',
}

export const revalidate = 60

export default async function MenuRoute() {
  const [categorias, items] = await Promise.all([getCategorias(), getItems()])

  const itemsPorCategoria = items.reduce<Record<string, Item[]>>((acc, item) => {
    if (!acc[item.categoria_id]) acc[item.categoria_id] = []
    acc[item.categoria_id].push(item)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="pt-10 pb-6 px-4 text-center">
        <h1 className="font-bebas text-6xl tracking-[0.15em] text-white leading-none">
          SushiFan
        </h1>
        <p className="font-inter text-sm font-light tracking-[0.3em] text-[var(--accent)] uppercase mt-1">
          wine bar
        </p>
        <div className="golden-divider mt-4 max-w-[160px] mx-auto" />
      </header>

      {categorias.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="font-bebas text-2xl text-[var(--muted)] tracking-widest">
            Menú en preparación
          </p>
          <p className="font-inter text-sm text-[var(--muted)] mt-2">
            Pronto tendremos novedades
          </p>
        </div>
      ) : (
        <MenuPage categorias={categorias} itemsPorCategoria={itemsPorCategoria} />
      )}
    </div>
  )
}
