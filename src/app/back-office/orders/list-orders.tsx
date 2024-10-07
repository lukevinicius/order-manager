import { fetchOrders } from '@/actions/orders/fetch-orders'
import { Button } from '@/components/ui/button'

export async function ListOrders() {
  const { orders } = await fetchOrders()
  const total = 1000

  return (
    <div className="grid grid-cols-3 gap-2 rounded-xl bg-zinc-800 p-4">
      {orders.map((order) => (
        <div key={order.id} className="space-y-2 rounded-xl bg-zinc-700 p-4">
          <div className="flex justify-between">
            <p>Cliente: Lucas</p>
          </div>
          <p className="font-semibold">
            Total:{' '}
            {total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <Button className="mt-2 w-full">Detalhes</Button>
        </div>
      ))}
      <div className="space-y-2 rounded-xl bg-zinc-700 p-4">
        <div className="flex justify-between">
          <p>Cliente: Lucas</p>
        </div>
        <p className="font-semibold">
          Total:{' '}
          {total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
        <Button className="mt-2 w-full">Detalhes</Button>
      </div>
    </div>
  )
}
