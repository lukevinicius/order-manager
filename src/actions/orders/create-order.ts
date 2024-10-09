'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  client: z
    .string()
    .min(3, { message: 'Nome do cliente deve ter no mínimo 3 caracteres' }),
})

export async function createOrder(formData: FormData) {
  const formDataObj = {
    client: formData.get('client'),
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

  await prisma.order
    .create({
      data: {
        client: data.client,
        total: 0,
      },
    })
    .catch((error) => {
      console.error(error)
      return {
        zodErrors: 'null',
        strapiErrors: error,
        message: 'Erro ao criar pedido',
      }
    })

  revalidatePath('/back-office/orders')

  return {}
}
