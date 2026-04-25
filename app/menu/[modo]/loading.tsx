export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="pt-10 pb-6 px-4 text-center">
        <div className="h-14 w-48 mx-auto bg-[var(--surface)] rounded animate-pulse" />
        <div className="h-3 w-20 mx-auto bg-[var(--surface)] rounded mt-2 animate-pulse" />
        <div className="golden-divider mt-4 max-w-[160px] mx-auto" />
      </div>

      <div className="sticky top-0 flex gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--background)]">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 w-24 bg-[var(--surface)] rounded-full animate-pulse" />
        ))}
      </div>

      <div className="px-4 pt-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 py-4 border-b border-[var(--border)]">
            <div className="w-24 h-24 rounded-full bg-[var(--surface)] animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-3/4 bg-[var(--surface)] rounded animate-pulse" />
              <div className="h-4 w-full bg-[var(--surface)] rounded animate-pulse" />
              <div className="h-4 w-1/4 bg-[var(--surface)] rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
