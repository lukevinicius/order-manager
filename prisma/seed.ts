import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/* function simpleHash(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0 // Converte para um inteiro de 32 bits
  }
  return hash.toString()
} */

async function main() {
  const passwordEncrypted = await bcrypt.hash('123456', 10)

  const SuperAdmin = {
    email: 'superadmin@mail.com',
    name: 'Super Admin',
    username: 'superadmin',
    role: 'SUPER_ADMIN',
    password: passwordEncrypted,
    document: '',
    phone: '',
  }

  // verify if user already exists
  const user = await prisma.user.findFirst({
    where: {
      email: SuperAdmin.email,
    },
  })

  if (user) {
    console.log('Super Admin already exists')
    return
  }

  await prisma.user
    .create({
      data: {
        email: SuperAdmin.email,
        name: SuperAdmin.name,
        username: SuperAdmin.username,
        role: SuperAdmin.role,
        password: SuperAdmin.password,
        document: SuperAdmin.document,
        phone: SuperAdmin.phone,
      },
    })
    .catch((e) => {
      console.error(e)
    })

  console.log('Super Admin created')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
