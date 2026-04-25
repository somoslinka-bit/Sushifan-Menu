/**
 * Formatea centavos ARS a formato argentino: 950000 → "$9.500"
 */
export function formatPrecio(centavos: number): string {
  const pesos = centavos / 100
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pesos)
}

export function pesosACentavos(pesos: number): number {
  return Math.round(pesos * 100)
}

export function centavosAPesos(centavos: number): number {
  return centavos / 100
}
