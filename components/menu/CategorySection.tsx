import ItemCard from './ItemCard'
import type { Categoria, Item } from '@/types'

interface CartProps {
  cart: Record<string, number>
  onAdd: (item: Item) => void
  onRemove: (itemId: string) => void
}

interface CategorySectionProps {
  categoria: Categoria
  items: Item[]
  cartProps?: CartProps
}

export default function CategorySection({ categoria, items, cartProps }: CategorySectionProps) {
  if (items.length === 0) return null

  return (
    <section id={`cat-${categoria.id}`} className="pt-8 pb-2 scroll-mt-16">
      <div className="px-4">
        <h2 className="font-bebas text-3xl tracking-widest text-[var(--accent)] uppercase">
          {categoria.nombre}
        </h2>
        <div className="golden-divider mt-2 mb-1" />
      </div>
      <div className="px-4">
        {items.map((item, index) => (
          <ItemCard
            key={item.id}
            item={item}
            index={index}
            cantidad={cartProps?.cart[item.id]}
            onAdd={cartProps ? () => cartProps.onAdd(item) : undefined}
            onRemove={cartProps ? () => cartProps.onRemove(item.id) : undefined}
          />
        ))}
      </div>
    </section>
  )
}
