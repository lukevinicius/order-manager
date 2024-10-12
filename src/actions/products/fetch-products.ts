import { prisma } from '@/lib/prisma'

export async function fetchProducts() {
  const products = await prisma.product.findMany()

  return {
    products: products.map((product) => ({
      ...product,
      price: product.price / 100,
    })),
  }
}
