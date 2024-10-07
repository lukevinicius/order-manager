import { CreateOrderDialog } from './create-order-dialog'
import { ListOrders } from './list-orders'

export default function OrdersPage() {
  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Pedidos</p>
        <CreateOrderDialog />
      </div>
      <ListOrders />
    </div>
  )
}
