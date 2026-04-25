import { getAllCategorias } from '@/lib/queries'
import CategoryManager from '@/components/admin/CategoryForm'

export default async function CategoriasPage() {
  const categorias = await getAllCategorias()

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-bebas text-3xl tracking-wide text-white">Categorías</h1>
        <p className="text-sm text-[var(--muted)] font-inter mt-0.5">
          Gestioná las secciones del menú. El orden determina cómo aparecen en el menú público.
        </p>
      </div>

      <div className="max-w-xl">
        <CategoryManager categorias={categorias} />
      </div>
    </div>
  )
}
