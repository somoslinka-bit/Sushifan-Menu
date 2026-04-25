import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SushiFan | Wine Bar',
  description: 'Menú digital SushiFan wine bar — Tandil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="font-inter bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
