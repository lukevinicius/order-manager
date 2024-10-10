'use server'

import { OrderStatus } from '@/domain/enums/Order'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function closeOrder(orderId: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.CLOSED },
    })

    revalidatePath('/back-office/orders')
  } catch (error) {
    console.error(error)

    return { error: 'Error closing order' }
  }

  return {}
}
