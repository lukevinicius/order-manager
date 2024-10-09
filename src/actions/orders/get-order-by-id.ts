'use server'

import { prisma } from '@/lib/prisma'

interface IRequest {
  orderId: string
}

export async function getOrderById({ orderId }: IRequest) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      id: true,
      client: true,
      total: true,
      status: true,
      Item: {
        select: {
          id: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
          quantity: true,
        },
      },
    },
  })

  return {
    order,
  }
}
