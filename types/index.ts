export interface Categoria {
  id: string
  nombre: string
  orden: number
  activa: boolean
  created_at: string
  updated_at: string
}

export interface Item {
  id: string
  categoria_id: string
  nombre: string
  descripcion: string | null
  precio: number
  imagen_url: string | null
  disponible: boolean
  orden: number
  created_at: string
  updated_at: string
}

export interface ItemConCategoria extends Item {
  categorias: Pick<Categoria, 'id' | 'nombre'>
}

export type ItemsPorCategoria = Record<string, Item[]>
