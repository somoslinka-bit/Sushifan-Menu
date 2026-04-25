import { getAllCategorias, getItems } from '@/lib/queries'
import ItemTable from '@/components/admin/ItemTable'
import NewItemButton from './NewItemButton'
import type { Item } from '@/types'

export default async function AdminPage() {
  const [categorias, items] = await Promise.all([getAllCategorias(), getItems()])

  const itemsPorCategoria = items.reduce<Record<string, Item[]>>((acc, item) => {
    if (!acc[item.categoria_id]) acc[item.categoria_id] = []
    acc[item.categoria_id].push(item)
    return acc
  }, {})

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bebas text-3xl tracking-wide text-white">Ítems del menú</h1>
          <p className="text-sm text-[var(--muted)] font-inter mt-0.5">
            {items.length} ítem{items.length !== 1 ? 's' : ''} en total
          </p>
        </div>
        <NewItemButton categorias={categorias} />
      </div>

      {categorias.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-[var(--border)] rounded-xl">
          <p className="text-[var(--muted)] font-inter text-sm">
            Primero creá una categoría en la sección Categorías.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {categorias.map((cat) => (
            <div key={cat.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <h2 className="font-bebas text-lg tracking-wide text-[var(--accent)]">
                  {cat.nombre}
                </h2>
                {!cat.activa && (
                  <span className="text-xs font-inter text-[var(--muted)] bg-[var(--surface-hover)] px-2 py-0.5 rounded-full">
                    Oculta en menú
                  </span>
                )}
              </div>
              <div className="px-4">
                <ItemTable
                  items={itemsPorCategoria[cat.id] ?? []}
                  categorias={categorias}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
