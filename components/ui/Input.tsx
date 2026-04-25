import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, id, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-inter text-[var(--muted)]">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          bg-[var(--surface)] border rounded-lg px-3 py-2 text-sm text-white font-inter
          placeholder:text-[var(--muted)] outline-none
          focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]
          transition-colors duration-150
          ${error ? 'border-red-500' : 'border-[var(--border)]'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
