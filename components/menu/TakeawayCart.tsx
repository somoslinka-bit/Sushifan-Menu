'use client'

import { useState, useEffect } from 'react'
import { formatPrecio } from '@/lib/formatters'
import type { Item } from '@/types'

const WHATSAPP_NUMBER = '5492494333204'

interface TakeawayCartProps {
  cart: Record<string, number>
  items: Item[]
  onClear: () => void
}

function buildWhatsAppUrl(cart: Record<string, number>, items: Item[]): string {
  const itemsMap = new Map(items.map((i) => [i.id, i]))
  const lines: string[] = ['Hola! Quiero hacer un pedido para *Takeaway* 🍣', '']
  let total = 0

  for (const [id, cantidad] of Object.entries(cart)) {
    if (cantidad <= 0) continue
    const item = itemsMap.get(id)
    if (!item) continue
    const subtotal = item.precio * cantidad
    total += subtotal
    lines.push(`• ${cantidad}x ${item.nombre} — ${formatPrecio(item.precio)} c/u`)
  }

  lines.push('')
  lines.push(`*Total: ${formatPrecio(total)}*`)

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
}

export default function TakeawayCart({ cart, items, onClear }: TakeawayCartProps) {
  const [expanded, setExpanded] = useState(false)

  const selectedItems = items.filter((i) => (cart[i.id] ?? 0) > 0)
  const totalItems = selectedItems.reduce((a, i) => a + (cart[i.id] ?? 0), 0)
  const totalPrice = selectedItems.reduce((a, i) => a + (cart[i.id] ?? 0) * i.precio, 0)

  useEffect(() => {
    if (totalItems === 0) setExpanded(false)
  }, [totalItems])

  if (totalItems === 0) return null

  return (
    <>
      {expanded && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setExpanded(false)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Panel expandible */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: expanded ? '420px' : '0px' }}
        >
          <div className="bg-[#242424] border-t border-[var(--border)] px-4 pt-5 pb-3">
            <p className="font-bebas text-sm tracking-[0.2em] text-[var(--muted)] uppercase mb-3">
              Tu pedido
            </p>

            <div className="space-y-2.5 mb-4">
              {selectedItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2">
                  <span className="font-inter text-sm text-white leading-tight flex-1 min-w-0">
                    <span className="text-[var(--accent)] font-semibold mr-1.5">
                      {cart[item.id]}×
                    </span>
                    {item.nombre}
                  </span>
                  <span className="font-inter text-sm text-[var(--muted)] flex-shrink-0">
                    {formatPrecio((cart[item.id] ?? 0) * item.precio)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--border)] pt-3 flex justify-between items-center mb-4">
              <span className="font-bebas text-lg tracking-widest text-white">Total</span>
              <span className="font-inter font-semibold text-white text-base">
                {formatPrecio(totalPrice)}
              </span>
            </div>

            <a
              href={buildWhatsAppUrl(cart, items)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#C9A84C] hover:bg-[#d4b55a] active:scale-[0.98] transition-all rounded-xl px-5 py-3.5 mb-2"
              style={{ boxShadow: '0 4px 24px rgba(201,168,76,0.3)' }}
            >
              <span className="font-bebas text-xl tracking-wider text-white">
                Realizar pedido por WhatsApp
              </span>
            </a>

            <button
              onClick={() => { onClear(); setExpanded(false) }}
              className="w-full text-center text-xs text-[var(--muted)] hover:text-white transition-colors py-2"
            >
              Limpiar selección
            </button>
          </div>
        </div>

        {/* Barra inferior siempre visible */}
        <div className="px-4 pb-6 pt-3 bg-[#1A1A1A] border-t border-[var(--border)]">
          <div className="flex gap-2">
            {/* Toggle expandir */}
            <button
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3.5 transition-all active:scale-95"
              aria-label="Ver detalle del pedido"
            >
              <span className="font-inter text-sm text-[var(--muted)]">
                {totalItems} {totalItems === 1 ? 'ítem' : 'ítems'}
              </span>
              <span
                className="text-[var(--accent)] text-base leading-none transition-transform duration-300"
                style={{ display: 'inline-block', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                ↑
              </span>
            </button>

            {/* CTA WhatsApp directo */}
            <a
              href={buildWhatsAppUrl(cart, items)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-between bg-[#C9A84C] hover:bg-[#d4b55a] active:scale-[0.98] transition-all rounded-xl px-5 py-3.5"
              style={{ boxShadow: '0 4px 24px rgba(201,168,76,0.35)' }}
            >
              <span className="font-bebas text-xl tracking-wider text-white">
                Realizar pedido
              </span>
              <span className="font-inter font-semibold text-white text-sm">
                {formatPrecio(totalPrice)}
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
