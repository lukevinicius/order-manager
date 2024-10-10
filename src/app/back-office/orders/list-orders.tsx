import { fetchOrders } from '@/actions/orders/fetch-orders'
import { UpdateOrderDialog } from '@/components/dialogs/update-order-dialog'
import { CloseOrderButton } from './close-order-button'
import { OrderStatus } from '@/domain/enums/Order'

export async function ListOrders() {
  const { closedOrders, openOrders } = await fetchOrders()

  return (
    <div className="space-y-4">
      <p className="font-semibold">Pedidos em aberto</p>
      <div className="rounded-xl bg-zinc-800 p-4">
        <div className="grid w-full gap-2 md:grid-cols-3">
          {openOrders.map((order) => (
            <div
              key={order.id}
              className="w-full space-y-2 rounded-xl bg-zinc-700 p-4"
            >
              <p>Cliente: {order.client}</p>
              <p>
                Status:{' '}
                <span
                  className={`font-semibold ${
                    order.status === OrderStatus.OPEN
                      ? 'text-green-500'
                      : 'text-red-500'
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
              {order.status === OrderStatus.OPEN && (
                <CloseOrderButton orderId={order.id} />
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="font-semibold">Pedidos fechados</p>
      <div className="grid w-full gap-2 md:grid-cols-3">
        {closedOrders.map((order) => (
          <div
            key={order.id}
            className="w-full space-y-2 rounded-xl bg-zinc-700 p-4"
          >
            <p>Cliente: {order.client}</p>
            <p>
              Status:{' '}
              <span
                className={`font-semibold ${
                  order.status === OrderStatus.OPEN
                    ? 'text-green-500'
                    : 'text-red-500'
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
            {order.status === OrderStatus.OPEN && (
              <CloseOrderButton orderId={order.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
