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

  const ordersMapped = orders.map((order) => ({
    ...order,
    total: order.total / 100,
  }))

  const openOrders = ordersMapped.filter(
    (order) => order.status === OrderStatus.OPEN,
  )
  const closedOrders = ordersMapped.filter(
    (order) => order.status === OrderStatus.CLOSED,
  )

  return { openOrders, closedOrders }
}
