'use server'

import { OrderStatus } from '@/domain/enums/Order'
import { prisma } from '@/lib/prisma'

export async function fetchOrders() {
  const orders = await prisma.order.findMany({
    select: {
      id: true,
      client: true,
      total: true,
      status: true,
    },
  })

  const openOrders = orders.filter((order) => order.status === OrderStatus.OPEN)
  const closedOrders = orders.filter(
    (order) => order.status === OrderStatus.CLOSED,
  )

  return { openOrders, closedOrders }
}
