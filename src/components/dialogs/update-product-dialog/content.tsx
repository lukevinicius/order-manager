import { DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { getProductById } from '@/actions/products/get-product-id'
import { UpdateProductForm } from './form'

export async function UpdateProductContent({
  productId,
}: {
  productId: string
}) {
  const { product } = await getProductById({ productId })

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Produto: {product ? product.name : 'Carregando pedido'}
        </DialogTitle>
      </DialogHeader>
      {product && <UpdateProductForm product={product} />}
    </>
  )
}
