'use client'

import { useState, useTransition } from 'react'

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
import { createProduct } from '@/actions/products/create-product'
import { normalizeCurrencyNumber } from '@/utils/normalizeCurrency'

export function CreateProductDialog() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleAction(formData: FormData) {
    startTransition(async () => {
      const { zodErrors } = await createProduct(formData)
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
          title="Criar produto"
          onClick={() => setDialogOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="border-none bg-zinc-900 text-zinc-50 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar um produto</DialogTitle>
        </DialogHeader>
        <form action={handleAction}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">
                Nome do produto
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3 text-zinc-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">
                Preço
              </Label>
              <Input
                id="price"
                name="price"
                inputMode="numeric"
                className="col-span-3 text-zinc-900"
                onChange={(e) => {
                  e.target.value = normalizeCurrencyNumber(e.target.value)
                }}
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
              'Criar produto'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
