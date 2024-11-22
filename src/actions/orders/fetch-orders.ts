'use server'

import { OrderStatus } from '@/domain/enums/Order'
import { prisma } from '@/lib/prisma'

interface IRequest {
  status: string
  startDate?: Date
  endDate?: Date
}

export async function fetchOrders({ status, startDate, endDate }: IRequest) {
  if (!startDate && !endDate && status === OrderStatus.CLOSED) {
    return { closedOrders: [] }
  }

  let orders: {
    id: string
    client: string
    total: number
    status: string
    updatedAt: Date
  }[] = []

  if (!startDate && !endDate && status === OrderStatus.OPEN) {
    orders = await prisma.order.findMany({
      where: {
        status,
      },
      select: {
        id: true,
        client: true,
        total: true,
        status: true,
        updatedAt: true,
      },
    })
  } else {
    orders = await prisma.order.findMany({
      where: {
        status,
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        client: true,
        total: true,
        status: true,
        updatedAt: true,
      },
    })
  }

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
