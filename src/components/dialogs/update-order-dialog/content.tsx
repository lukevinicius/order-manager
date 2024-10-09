import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { UpdateOrderForm } from './form'
import { getOrderById } from '@/actions/orders/get-order-by-id'
import { fetchProducts } from '@/actions/products/fetch-products'

export async function UpdateOrderContent({ orderId }: { orderId: string }) {
  const { order } = await getOrderById({ orderId })
  const { products } = await fetchProducts()

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Cliente: {order ? order.client : 'Carregando pedido'}
        </DialogTitle>
      </DialogHeader>
      {order && <UpdateOrderForm order={order} products={products} />}
    </>
  )
}
