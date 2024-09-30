'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface IRequest {
  userId: string
  name: string
  email: string
  username: string
}

export async function updateUser({ userId, name, email, username }: IRequest) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
      username,
    },
  })

  revalidatePath('/back-office/users')

  redirect('/back-office/users')
}
