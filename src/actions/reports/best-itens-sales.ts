'use server'

import { prisma } from '@/lib/prisma'

export async function bestItensSales() {
  const bestItens = await prisma.item.groupBy({
    by: ['productId'],
    _sum: {
      quantity: true,
    },
  })

  const bestItensSales = bestItens.sort(
    (a, b) => b._sum.quantity || 0 - a._sum.quantity || 0,
  )

  return { bestItensSales }
}
