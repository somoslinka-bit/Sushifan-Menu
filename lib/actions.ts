'use server'

import { createSupabaseServerClient } from './supabaseServer'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// --- Auth ---

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

// --- Categorías ---

export async function upsertCategoria(formData: FormData) {
  const supabase = await createSupabaseServerClient()

  const id = formData.get('id') as string | null
  const nombre = (formData.get('nombre') as string).trim()
  const orden = parseInt(formData.get('orden') as string, 10) || 0
  const activa = formData.get('activa') === 'true'
  const modo = (formData.get('modo') as string) || 'resto'

  if (!nombre) return { error: 'El nombre es requerido' }
  if (!['resto', 'takeaway', 'ambos'].includes(modo)) return { error: 'Modo inválido' }

  const payload = { nombre, orden, activa, modo }

  const { error } = id
    ? await supabase.from('categorias').update(payload).eq('id', id)
    : await supabase.from('categorias').insert(payload)

  if (error) return { error: error.message }

  revalidatePath('/admin/categorias')
  revalidatePath('/menu')
  revalidatePath('/menu/resto')
  revalidatePath('/menu/takeaway')
  return { success: true }
}

export async function deleteCategoria(id: string) {
  const supabase = await createSupabaseServerClient()

  const { count } = await supabase
    .from('items')
    .select('id', { count: 'exact', head: true })
    .eq('categoria_id', id)

  if (count && count > 0) {
    return { error: 'No se puede eliminar una categoría con ítems' }
  }

  const { error } = await supabase.from('categorias').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/categorias')
  revalidatePath('/menu')
  revalidatePath('/menu/resto')
  revalidatePath('/menu/takeaway')
  return { success: true }
}

export async function toggleCategoriaActiva(id: string, activa: boolean) {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('categorias')
    .update({ activa })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/categorias')
  revalidatePath('/menu')
  revalidatePath('/menu/resto')
  revalidatePath('/menu/takeaway')
  return { success: true }
}

// --- Ítems ---

export async function upsertItem(formData: FormData) {
  const supabase = await createSupabaseServerClient()

  const id = formData.get('id') as string | null
  const nombre = (formData.get('nombre') as string).trim()
  const descripcion = (formData.get('descripcion') as string)?.trim() || null
  const precioInput = parseFloat(formData.get('precio') as string)
  const precio = Math.round(precioInput * 100)
  const categoria_id = formData.get('categoria_id') as string
  const imagen_url = (formData.get('imagen_url') as string) || null
  const disponible = formData.get('disponible') === 'true'
  const orden = parseInt(formData.get('orden') as string, 10) || 0

  // Precio alternativo (opcional)
  const precioAltInput = formData.get('precio_alternativo') as string
  const precio_alternativo = precioAltInput ? Math.round(parseFloat(precioAltInput) * 100) : null
  const etiqueta_precio = (formData.get('etiqueta_precio') as string)?.trim() || null
  const etiqueta_precio_alt = (formData.get('etiqueta_precio_alt') as string)?.trim() || null

  if (!nombre) return { error: 'El nombre es requerido' }
  if (!categoria_id) return { error: 'La categoría es requerida' }
  if (isNaN(precio) || precio < 0) return { error: 'El precio no es válido' }

  const payload = {
    nombre,
    descripcion,
    precio,
    precio_alternativo,
    etiqueta_precio,
    etiqueta_precio_alt,
    categoria_id,
    imagen_url,
    disponible,
    orden,
  }

  const { data, error } = id
    ? await supabase.from('items').update(payload).eq('id', id).select('id').single()
    : await supabase.from('items').insert(payload).select('id').single()

  if (error) return { error: error.message }

  revalidatePath('/admin/items')
  revalidatePath('/menu')
  revalidatePath('/menu/resto')
  revalidatePath('/menu/takeaway')
  return { success: true, id: data?.id }
}

export async function deleteItem(id: string) {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('items').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/items')
  revalidatePath('/menu')
  revalidatePath('/menu/resto')
  revalidatePath('/menu/takeaway')
  return { success: true }
}

export async function toggleDisponible(id: string, disponible: boolean) {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('items')
    .update({ disponible })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/items')
  revalidatePath('/menu')
  revalidatePath('/menu/resto')
  revalidatePath('/menu/takeaway')
  return { success: true }
}
