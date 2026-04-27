import { createSupabaseServerClient } from './supabaseServer'
import type { Categoria, Item } from '@/types'

export async function getCategorias(modo?: 'resto' | 'takeaway' | 'vinos'): Promise<Categoria[]> {
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from('categorias')
    .select('*')
    .eq('activa', true)
    .order('orden', { ascending: true })

  if (modo === 'vinos') {
    query = query.eq('modo', 'vinos')
  } else if (modo) {
    query = query.or(`modo.eq.${modo},modo.eq.ambos`)
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getAllCategorias(): Promise<Categoria[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('orden', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getItems(): Promise<Item[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .order('orden', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getItemsByCategoria(categoriaId: string): Promise<Item[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('categoria_id', categoriaId)
    .order('orden', { ascending: true })

  if (error) throw error
  return data ?? []
}
