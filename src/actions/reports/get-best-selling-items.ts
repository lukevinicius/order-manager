'use server'

import { prisma } from '@/lib/prisma'
import { OrderStatus } from '@/domain/enums/Order'

export async function getBestSellingItems(startDate: Date, endDate: Date) {
  const orders = await prisma.order.findMany({
    where: {
      status: OrderStatus.CLOSED,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      Item: {
        select: {
          productId: true,
          quantity: true,
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  const items: { [key: string]: { name: string; quantity: number } } = {}

  orders.forEach((order) => {
    if (Array.isArray(order.Item)) {
      order.Item.forEach((item) => {
        if (items[item.productId]) {
          items[item.productId].quantity += item.quantity
        } else {
          items[item.productId] = {
            name: item.product.name,
            quantity: item.quantity,
          }
        }
      })
    }
  })

  // order items by quantity
  const sortedItems: any = Object.values(items).sort(
    (a: any, b: any) => b.quantity - a.quantity,
  )

  // take top 10 items
  sortedItems.splice(10)

  return {
    items: sortedItems,
  }
}
