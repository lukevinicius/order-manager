'use client'

import { useState, useTransition } from 'react'

import { createOrder } from '@/actions/orders/create-order'

import { CreateDialogButton } from '@/components/buttons/create-dialog-buttom'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

export function CreateOrderDialog() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleAction(formData: FormData) {
    startTransition(async () => {
      const { zodErrors } = await createOrder(formData)
      if (zodErrors) return
      setDialogOpen(false)
    })
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(dialogOpen) => setDialogOpen(dialogOpen)}
    >
      <DialogTrigger>
        <CreateDialogButton
          title="Criar pedido"
          onClick={() => setDialogOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="border-none bg-zinc-900 text-zinc-50 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Abrir um pedido</DialogTitle>
        </DialogHeader>
        <form action={handleAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Cliente
              </Label>
              <Input
                id="name"
                name="client"
                placeholder="Nome do cliente"
                className="col-span-3 text-zinc-900"
              />
            </div>
          </div>
          <Button
            disabled={isPending}
            className="w-full bg-emerald-600 hover:bg-emerald-500"
          >
            {isPending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              'Criar pedido'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
