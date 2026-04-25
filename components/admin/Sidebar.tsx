'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/lib/actions'

const navItems = [
  {
    href: '/admin',
    label: 'Ítems',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: '/admin/categorias',
    label: 'Categorías',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    href: '/admin/qr',
    label: 'Código QR',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="5" height="5" /><rect x="16" y="3" width="5" height="5" />
        <rect x="3" y="16" width="5" height="5" /><path d="M21 16h-3v3M21 21h-3M12 3v3M12 12v3M12 21v-3M9 12h3M15 12h3M12 6h3" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-full md:w-56 md:min-h-screen bg-[var(--surface)] border-b md:border-b-0 md:border-r border-[var(--border)]">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[var(--border)]">
        <Link href="/admin" className="block">
          <p className="font-bebas text-2xl tracking-widest text-[var(--accent)] leading-none">SushiFan</p>
          <p className="text-[10px] font-inter text-[var(--muted)] tracking-[0.2em] uppercase">Panel admin</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex md:flex-col gap-1 p-2 overflow-x-auto md:overflow-visible flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-inter transition-colors whitespace-nowrap
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
                ${isActive
                  ? 'bg-[var(--accent-dim)] text-[var(--accent)]'
                  : 'text-[var(--muted)] hover:text-white hover:bg-[var(--surface-hover)]'
                }
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-[var(--border)] hidden md:block">
        <Link
          href="/menu"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-inter text-[var(--muted)] hover:text-white hover:bg-[var(--surface-hover)] transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Ver menú público
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-inter text-[var(--muted)] hover:text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  )
}
