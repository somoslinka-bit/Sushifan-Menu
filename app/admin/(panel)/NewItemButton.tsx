'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import ItemForm from '@/components/admin/ItemForm'
import type { Categoria } from '@/types'

interface NewItemButtonProps {
  categorias: Categoria[]
}

export default function NewItemButton({ categorias }: NewItemButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>+ Nuevo ítem</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Nuevo ítem">
        <ItemForm
          categorias={categorias}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </>
  )
}
