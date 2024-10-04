'use server'

import { prisma } from '@/lib/prisma'

interface IRequest {
  productId: string
}

export async function getProductById({ productId }: IRequest) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        name: true,
        price: true,
      },
    })

    if (!product) {
      return { error: 'Produto não encontrado' }
    }

    return { product }
  } catch (error) {
    console.error(error)
    return { error: 'Erro ao localizar produto' }
  }
}
