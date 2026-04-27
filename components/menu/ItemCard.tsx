import Image from 'next/image'
import { formatPrecio } from '@/lib/formatters'
import type { Item } from '@/types'

interface ItemCardProps {
  item: Item
  index: number
  cantidad?: number
  onAdd?: () => void
  onRemove?: () => void
}

export default function ItemCard({ item, index, cantidad, onAdd, onRemove }: ItemCardProps) {
  const tienePrecioDual = item.precio_alternativo != null
  const esTakeaway = onAdd !== undefined
  const agotado = !item.disponible

  return (
    <div
      className="item-enter flex items-center gap-4 py-4 border-b border-[var(--border)] last:border-0"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Foto circular */}
      <div className="relative flex-shrink-0">
        <div
          className="w-24 h-24 rounded-full overflow-hidden"
          style={{
            boxShadow: '0 0 0 2px rgba(201,168,76,0.25), 0 8px 24px rgba(0,0,0,0.6)',
          }}
        >
          {item.imagen_url ? (
            <Image
              src={item.imagen_url}
              alt={item.nombre}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[var(--surface)] flex items-center justify-center">
              <span className="text-2xl opacity-30">🍣</span>
            </div>
          )}
        </div>
        {agotado && (
          <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
            <span className="text-[10px] font-inter font-semibold text-white uppercase tracking-wider leading-tight text-center px-1">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bebas text-xl tracking-wide text-white leading-tight">
          {item.nombre}
        </h3>
        {item.descripcion && (
          <p className="text-sm text-[var(--muted)] leading-relaxed mt-0.5 line-clamp-2 font-inter">
            {item.descripcion}
          </p>
        )}

        {tienePrecioDual ? (
          <p className="font-inter font-semibold text-[var(--accent)] text-base mt-1.5">
            {item.etiqueta_precio && (
              <span className="text-[var(--muted)] font-normal text-sm mr-1">
                {item.etiqueta_precio}
              </span>
            )}
            {formatPrecio(item.precio)}
            <span className="text-[var(--muted)] font-normal mx-1.5">/</span>
            {item.etiqueta_precio_alt && (
              <span className="text-[var(--muted)] font-normal text-sm mr-1">
                {item.etiqueta_precio_alt}
              </span>
            )}
            {formatPrecio(item.precio_alternativo!)}
          </p>
        ) : (
          <p className="font-inter font-semibold text-[var(--accent)] text-base mt-1.5">
            {formatPrecio(item.precio)}
          </p>
        )}
      </div>

      {/* Controles takeaway */}
      {esTakeaway && (
        <div className="flex-shrink-0 flex items-center">
          {!cantidad || cantidad === 0 ? (
            <button
              onClick={onAdd}
              disabled={agotado}
              className="w-9 h-9 rounded-full border-2 border-[var(--accent)] flex items-center justify-center text-[var(--accent)] text-xl font-light transition-all active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--accent)] hover:text-black"
              aria-label={`Agregar ${item.nombre}`}
            >
              +
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onRemove}
                className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] text-lg font-light transition-all active:scale-90 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                aria-label={`Quitar ${item.nombre}`}
              >
                −
              </button>
              <span className="font-bebas text-xl text-white w-5 text-center leading-none">
                {cantidad}
              </span>
              <button
                onClick={onAdd}
                className="w-8 h-8 rounded-full border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] text-lg font-light transition-all active:scale-90 hover:bg-[var(--accent)] hover:text-black"
                aria-label={`Agregar otro ${item.nombre}`}
              >
                +
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
