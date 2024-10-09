'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface IRequest {
  itemId: string
  quantity: number
  operation: 'increment' | 'decrement'
}

export async function updateItem({ itemId, quantity, operation }: IRequest) {
  let itemUpdated

  if (quantity === 1 && operation === 'decrement') {
    itemUpdated = await prisma.item.delete({
      where: { id: itemId },
      select: {
        orderId: true,
        product: {
          select: {
            price: true,
          },
        },
      },
    })
  } else {
    itemUpdated = await prisma.item.update({
      where: { id: itemId },
      data: {
        quantity: {
          [operation]: 1,
        },
      },
      select: {
        orderId: true,
        product: {
          select: {
            price: true,
          },
        },
      },
    })
  }

  if (!itemUpdated) {
    return
  }

  await prisma.order.update({
    where: { id: itemUpdated.orderId },
    data: { total: { [operation]: itemUpdated.product.price } },
  })

  revalidatePath('/back-office/orders')
}
