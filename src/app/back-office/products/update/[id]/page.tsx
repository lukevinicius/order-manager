import { getProductById } from '@/actions/products/get-product-id'
import { UpdateProductForm } from './update-form'

interface UpdateProductProps {
  params: {
    id: string
  }
}

export default async function UpdateProduct({ params }: UpdateProductProps) {
  const { product } = await getProductById({
    productId: params.id,
  })

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Edição do usuário</p>
      </div>
      {product && <UpdateProductForm product={product} />}
    </div>
  )
}
