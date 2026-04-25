import { createSupabaseServerClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
