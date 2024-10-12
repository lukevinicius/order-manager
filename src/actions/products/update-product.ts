'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

interface IRequest {
  productId: string
  formData: FormData
}

const schema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  price: z.coerce.number().positive('O preço deve ser positivo'),
})

export async function updateProduct({ productId, formData }: IRequest) {
  // transform R$ 1.000,65 to 1000.65
  const price = Number(
    ((formData.get('price') as string) || '0').replace(/\D/g, ''),
  )

  const formDataObj = {
    name: formData.get('name'),
    price,
  }

  const validatedFields = schema.safeParse(formDataObj)

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors)
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Erro ao criar pedido',
    }
  }

  const data = validatedFields.data

  try {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: data.name,
        price: data.price,
      },
    })

    revalidatePath('/back-office/products')
  } catch (error) {
    console.error(error)
    return { error: 'Erro ao atualizar produto' }
  }

  return {}
}
