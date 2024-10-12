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
import { NumericFormat } from 'react-number-format'

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
              <NumericFormat
                name="price"
                placeholder="Preço"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-zinc-800 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                prefix="R$ "
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                thousandSeparator="."
                allowLeadingZeros={false}
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
