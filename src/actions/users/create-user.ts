'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'

interface IRequest {
  email: string
  name: string
  username: string
  role: string
  password: string
  document: string
  phone: string
}

export async function createUser({
  email,
  name,
  username,
  role,
  password,
  document,
  phone,
}: IRequest) {
  try {
    const passwordEncrypted = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        name,
        username,
        role,
        password: passwordEncrypted,
        document,
        phone,
      },
    })

    revalidatePath('/back-office/users')
  } catch (error) {
    console.error(error)

    return {
      error: 'Erro ao criar usuário',
    }
  }

  return {}
}
