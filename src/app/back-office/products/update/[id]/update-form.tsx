'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { updateProduct } from '@/actions/products/update-product'
import { useToast } from '@/components/ui/use-toast'
import { Form } from '@/components/form'

interface UpdateProductFormProps {
  product: {
    id: string
    name: string
    price: number
  }
}

export function UpdateProductForm({ product }: UpdateProductFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function onSubmit(data: FormData) {
    startTransition(async () => {
      await updateProduct({
        productId: product.id,
        name: data.get('name') as string,
        price: Number(data.get('price')) || 0,
      }).then(() => {
        toast({
          title: 'Usuário atualizado com sucesso',
        })

        router.back()
      })
    })
  }

  return (
    <form action={onSubmit} className="rounded-xl bg-zinc-800 p-4">
      <div className="grid grid-cols-2 gap-4">
        <Form.Field>
          <Form.Label htmlFor="name">Nome do produto</Form.Label>
          <Input
            name="name"
            disabled={isPending}
            placeholder="Ex: Batata frita"
            className="text-zinc-800"
            defaultValue={product.name}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor="price">Valor</Form.Label>
          <Input
            name="price"
            disabled={isPending}
            placeholder="2.99"
            className="text-zinc-800"
            type="number"
            defaultValue={product.price}
          />
        </Form.Field>
      </div>
      <div className="flex justify-end space-x-3">
        <Button
          className="mt-3 font-bold text-zinc-50"
          type="button"
          variant="ghost"
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
        <Button
          className="mt-3 bg-green-500 font-bold text-zinc-50 hover:bg-green-600"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            'Atualizar'
          )}
        </Button>
      </div>
    </form>
  )
}
