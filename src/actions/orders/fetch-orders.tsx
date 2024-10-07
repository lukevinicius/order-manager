'use server'

import { prisma } from '@/lib/prisma'

export async function fetchOrders() {
  const orders = await prisma.order.findMany({
    select: {
      id: true,
      client: true,
      total: true,
    },
  })

  return { orders }
}
