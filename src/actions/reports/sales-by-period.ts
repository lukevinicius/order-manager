'use server'

import { OrderStatus } from '@/domain/enums/Order'
import { prisma } from '@/lib/prisma'

export async function salesByPeriod(startDate: Date, endDate: Date) {
  const openSales = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
    where: {
      status: OrderStatus.OPEN,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  const sales = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
    where: {
      status: OrderStatus.CLOSED,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  return {
    sales: sales._sum.total,
    openSales: openSales._sum.total,
  }
}
