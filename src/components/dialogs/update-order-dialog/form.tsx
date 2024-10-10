'use client'

import { useTransition } from 'react'

import { Button } from '@/components/ui/button'

import { Minus, Plus } from 'lucide-react'
import { addProductInOrder } from '@/actions/orders/add-item-in-order'
import { updateItem } from '@/actions/orders/update-item'
import { OrderStatus } from '@/domain/enums/Order'

interface UpdateOrderFormProps {
  order: {
    id: string
    client: string
    total: number
    status: string
    Item: {
      id: string
      product: {
        id: string
        name: string
        price: number
      }
      quantity: number
    }[]
  }
  products: {
    id: string
    name: string
    price: number
  }[]
}

export function UpdateOrderForm({ order, products }: UpdateOrderFormProps) {
  const [isPending, startTransition] = useTransition()

  async function handleAddProduct(formData: FormData) {
    const productId = formData.get('product') as string

    startTransition(async () => {
      await addProductInOrder({ orderId: order.id, productId })
    })
  }

  async function handleUpdateItem(
    itemId: string,
    operation: 'increment' | 'decrement',
    quantity: number,
  ) {
    startTransition(async () => {
      await updateItem({ itemId, operation, quantity })
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="font-semibold">
          Total:{' '}
          {order.total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
        <p>
          Status:{' '}
          <span
            className={`font-semibold ${
              order.status === OrderStatus.OPEN
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {order.status}
          </span>
        </p>
      </div>
      <form action={handleAddProduct} className="flex justify-between gap-2">
        <select name="product" className="w-full rounded-md px-2 text-zinc-900">
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} -{' '}
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </option>
          ))}
        </select>
        <Button
          className="bg-emerald-600 font-bold hover:bg-emerald-700"
          disabled={isPending}
        >
          Adicionar item
        </Button>
      </form>
      <div className="h-full space-y-2">
        {order?.Item &&
          order.Item.map((item) => (
            <div
              key={item.product.name}
              className="flex items-center justify-between rounded-xl bg-zinc-700 p-4"
            >
              <p>{item.product.name}</p>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  className="bg-emerald-600 font-bold hover:bg-emerald-700"
                  onClick={() =>
                    handleUpdateItem(item.id, 'increment', item.quantity)
                  }
                  disabled={isPending}
                >
                  <Plus />
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="sm"
                  className="bg-red-600 font-bold hover:bg-red-700"
                  onClick={() =>
                    handleUpdateItem(item.id, 'decrement', item.quantity)
                  }
                  disabled={isPending}
                >
                  <Minus />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
