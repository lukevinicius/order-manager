'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface IRequest {
  productId: string
  name: string
  price: number
}

export async function updateProduct({ productId, name, price }: IRequest) {
  try {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
      },
    })

    revalidatePath('/back-office/products')
  } catch (error) {
    console.error(error)
    return { error: 'Erro ao atualizar produto' }
  }

  return {}
}
