'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { createSupabaseBrowserClient } from '@/lib/supabaseClient'

interface ImageUploaderProps {
  currentUrl: string | null
  onUpload: (url: string) => void
}

export default function ImageUploader({ currentUrl, onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setError(null)

    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen debe pesar menos de 2MB')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setUploading(true)

    try {
      const supabase = createSupabaseBrowserClient()
      const ext = file.name.split('.').pop()
      const path = `items/${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(path, file, { upsert: false })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('menu-images').getPublicUrl(path)
      onUpload(data.publicUrl)
    } catch {
      setError('Error al subir la imagen. Intentá de nuevo.')
      setPreview(currentUrl)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group border-2 border-dashed border-[var(--border)] hover:border-[var(--accent)] transition-colors"
        onClick={() => inputRef.current?.click()}
        style={preview ? { border: '2px solid rgba(201,168,76,0.4)' } : undefined}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={96}
            height={96}
            className="w-full h-full object-cover"
            unoptimized={preview.startsWith('blob:')}
          />
        ) : (
          <div className="w-full h-full bg-[var(--surface)] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
        )}

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        {uploading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full">
            <svg className="animate-spin h-5 w-5 text-[var(--accent)]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
      </div>

      <p className="text-xs text-[var(--muted)] font-inter">
        {uploading ? 'Subiendo...' : 'Clic para cambiar imagen'}
      </p>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
    </div>
  )
}
