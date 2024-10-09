'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface IRequest {
  name: string
  price: number
  description?: string
  photoUrl?: string
}

export async function createProduct({
  name,
  price,
  description,
  photoUrl,
}: IRequest) {
  try {
    await prisma.product.create({
      data: {
        name,
        price,
        description,
        photoUrl,
      },
    })

    revalidatePath('/back-office/products')
  } catch (error) {
    console.error(error)

    return {
      error: 'Erro ao criar produto',
    }
  }

  return {}
}
