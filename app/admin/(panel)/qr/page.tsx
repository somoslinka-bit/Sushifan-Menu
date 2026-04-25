import QRGenerator from './QRGenerator'

export default function QRPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-bebas text-3xl tracking-wide text-white">Código QR</h1>
        <p className="text-sm text-[var(--muted)] font-inter mt-0.5">
          Dos QR: uno para el menú Restó y otro para Takeaway. Descargalos para imprimir.
        </p>
      </div>
      <QRGenerator />
    </div>
  )
}
