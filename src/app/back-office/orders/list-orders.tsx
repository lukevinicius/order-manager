import { fetchOrders } from '@/actions/orders/fetch-orders'
import { UpdateOrderDialog } from '@/components/dialogs/update-order-dialog'

export async function ListOrders() {
  const { orders } = await fetchOrders()

  return (
    <div className="grid w-full gap-2 rounded-xl bg-zinc-800 p-4 md:grid-cols-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="w-full space-y-2 rounded-xl bg-zinc-700 p-4"
        >
          <p>Cliente: {order.client}</p>
          <p>
            Status:{' '}
            <span
              className={`font-semibold ${
                order.status === 'OPEN' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {order.status}
            </span>
          </p>
          <p className="font-semibold">
            Total:{' '}
            {order.total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <UpdateOrderDialog orderId={order.id} />
        </div>
      ))}
    </div>
  )
}
