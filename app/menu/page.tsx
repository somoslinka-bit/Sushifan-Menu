import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SushiFan | Menú',
  description: 'Menú digital SushiFan wine bar — Tandil',
}

export default function MenuLanding() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-bebas text-6xl tracking-[0.15em] text-white leading-none">
          SushiFan
        </h1>
        <p className="font-inter text-sm font-light tracking-[0.3em] text-[var(--accent)] uppercase mt-1">
          wine bar
        </p>
        <div className="golden-divider mt-4 max-w-[160px] mx-auto" />
      </div>

      {/* Selector */}
      <p className="font-inter text-sm text-[var(--muted)] tracking-widest uppercase mb-8">
        ¿Cómo vas a pedir?
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          href="/menu/resto"
          className="group flex flex-col items-center gap-1 border border-[var(--accent)] rounded-2xl py-6 px-4 text-center transition-all hover:bg-[var(--accent)]/10 active:scale-[0.97]"
        >
          <span className="font-bebas text-3xl tracking-widest text-[var(--accent)]">
            Restó
          </span>
          <span className="font-inter text-xs text-[var(--muted)]">
            Menú completo en el salón
          </span>
        </Link>

        <Link
          href="/menu/takeaway"
          className="group flex flex-col items-center gap-1 border border-[var(--border)] rounded-2xl py-6 px-4 text-center transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 active:scale-[0.97]"
        >
          <span className="font-bebas text-3xl tracking-widest text-white">
            Takeaway
          </span>
          <span className="font-inter text-xs text-[var(--muted)]">
            Para llevar
          </span>
        </Link>
      </div>
    </div>
  )
}
