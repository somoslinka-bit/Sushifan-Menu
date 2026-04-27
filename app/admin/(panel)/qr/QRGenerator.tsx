'use client'

import { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface QRCardProps {
  label: string
  sublabel: string
  path: string
  filename: string
}

function QRCard({ label, sublabel, path, filename }: QRCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    const svgEl = containerRef.current?.querySelector('svg')
    if (!svgEl) return

    const size = 600
    const padding = 40
    const logoHeight = 60
    const totalHeight = size + padding * 2 + logoHeight + 24

    const canvas = document.createElement('canvas')
    canvas.width = size + padding * 2
    canvas.height = totalHeight
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = '#1A1A1A'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#C9A84C'
    ctx.font = 'bold 48px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText('SUSHIFAN', canvas.width / 2, padding + 44)

    ctx.fillStyle = '#888888'
    ctx.font = '14px Arial, sans-serif'
    ctx.fillText(`wine bar — ${label}`, canvas.width / 2, padding + 66)

    const lineY = padding + 80
    const grad = ctx.createLinearGradient(padding, lineY, canvas.width - padding, lineY)
    grad.addColorStop(0, 'transparent')
    grad.addColorStop(0.5, '#C9A84C')
    grad.addColorStop(1, 'transparent')
    ctx.strokeStyle = grad
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding * 2, lineY)
    ctx.lineTo(canvas.width - padding * 2, lineY)
    ctx.stroke()

    const svgData = new XMLSerializer().serializeToString(svgEl)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      const qrY = padding + logoHeight + 24
      ctx.drawImage(img, padding, qrY, size, size)

      const link = document.createElement('a')
      link.download = filename
      link.href = canvas.toDataURL('image/png')
      link.click()
      URL.revokeObjectURL(svgUrl)
    }
    img.src = svgUrl
  }

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}${path}`
    : `https://sushifan.com${path}`

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs">
      <div
        className="bg-[#111] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center gap-4 w-full"
        style={{ boxShadow: '0 0 40px rgba(201,168,76,0.08)' }}
      >
        <div className="text-center">
          <p className="font-bebas text-2xl tracking-[0.15em] text-[var(--accent)]">SUSHIFAN</p>
          <p className="font-inter text-xs tracking-[0.3em] text-[var(--muted)] uppercase">
            {sublabel}
          </p>
          <div className="golden-divider mt-2 max-w-[100px] mx-auto" />
          <p className="font-bebas text-lg tracking-widest text-white mt-2">{label}</p>
        </div>

        <div ref={containerRef} className="bg-white p-3 rounded-xl">
          <QRCodeSVG
            value={url}
            size={180}
            bgColor="#ffffff"
            fgColor="#1A1A1A"
            level="H"
          />
        </div>

        <p className="text-xs text-[var(--muted)] font-inter tracking-widest uppercase">
          Escaneá para ver el menú
        </p>
      </div>

      <button
        onClick={handleDownload}
        className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-black font-inter font-semibold text-sm py-3 px-6 rounded-xl transition-all active:scale-[0.97] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Descargar PNG
      </button>

      <p className="text-xs text-[var(--muted)] font-inter text-center">
        Apunta a <span className="text-[var(--accent)]">{path}</span>
      </p>
    </div>
  )
}

export default function QRGenerator() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center flex-wrap">
      <QRCard
        label="Restó"
        sublabel="wine bar"
        path="/menu/resto"
        filename="sushifan-qr-resto.png"
      />
      <QRCard
        label="Takeaway"
        sublabel="wine bar"
        path="/menu/takeaway"
        filename="sushifan-qr-takeaway.png"
      />
      <QRCard
        label="Carta de Vinos"
        sublabel="wine bar"
        path="/menu/vinos"
        filename="sushifan-qr-vinos.png"
      />
    </div>
  )
}
