'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface IRequest {
  orderId: string
  productId: string
}

export async function addProductInOrder({ orderId, productId }: IRequest) {
  const item = await prisma.item.findFirst({
    where: {
      orderId,
      productId,
    },
  })

  let itemAdded

  if (item) {
    itemAdded = await prisma.item.update({
      where: { id: item.id },
      data: { quantity: { increment: 1 } },
      select: {
        product: {
          select: {
            price: true,
          },
        },
      },
    })
  } else {
    itemAdded = await prisma.item.create({
      data: {
        product: {
          connect: { id: productId },
        },
        order: {
          connect: { id: orderId },
        },
        quantity: 1,
      },
      select: {
        product: {
          select: {
            price: true,
          },
        },
      },
    })
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { total: { increment: itemAdded.product.price } },
  })

  revalidatePath('/back-office/orders')
}
