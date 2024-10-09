'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Trash } from 'lucide-react'

export function DeleteUserButton() {
  async function handleDeleteUser() {
    toast({
      title: 'Usuário excluído com sucesso',
    })
  }

  return (
    <Button
      size="sm"
      className="w-full bg-red-600 font-bold hover:bg-red-700"
      onClick={() => {
        handleDeleteUser()
      }}
    >
      <Trash size={16} />
    </Button>
  )
}
