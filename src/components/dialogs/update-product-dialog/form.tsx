'use client'

import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/form/label'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { updateProduct } from '@/actions/products/update-product'
import { normalizeCurrencyNumber } from '@/utils/normalizeCurrency'

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
          <Input
            id="price"
            name="price"
            inputMode="numeric"
            className="col-span-3 text-zinc-900"
            onChange={(e) => {
              e.target.value = normalizeCurrencyNumber(e.target.value)
            }}
            defaultValue={normalizeCurrencyNumber(String(product.price * 100))}
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
