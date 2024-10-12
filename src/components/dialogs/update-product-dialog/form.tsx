'use client'

import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/form/label'
import { NumericFormat } from 'react-number-format'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { updateProduct } from '@/actions/products/update-product'

interface IUpdateProductFormProps {
  product: {
    id: string
    name: string
    price: number
  }
}

export function UpdateProductForm({ product }: IUpdateProductFormProps) {
  const [isPending, startTransition] = useTransition()

  function handleAction(formData: FormData) {
    startTransition(async () => {
      await updateProduct({
        productId: product.id,
        formData,
      })
    })
  }
  return (
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
            defaultValue={product.name}
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
            defaultValue={product.price}
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
          'Atualizar produto'
        )}
      </Button>
    </form>
  )
}
