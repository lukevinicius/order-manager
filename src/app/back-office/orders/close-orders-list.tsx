'use client'

import { UpdateOrderDialog } from '@/components/dialogs/update-order-dialog'
import { CloseOrderButton } from './close-order-button'
import { OrderStatus, OrderStatusNames } from '@/domain/enums/Order'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { fetchOrders } from '@/actions/orders/fetch-orders'
import { formatPeriodToDate } from '@/utils/formatPeriodToDate'
import { useState } from 'react'

interface IOrders {
  id: string
  client: string
  total: number
  status: string
  updatedAt: Date
}

export function ClosedOrdersList() {
  const [closedOrders, setClosedOrders] = useState<IOrders[]>([])

  async function handleFetchOrders(period: string) {
    const { startDate, endDate } = formatPeriodToDate(period)

    const orders = await fetchOrders({
      status: OrderStatus.CLOSED,
      startDate,
      endDate,
    })

    setClosedOrders(orders.closedOrders)
  }

  return (
    <>
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="font-semibold">Pedidos fechados</p>
        <Select
          onValueChange={(value) => handleFetchOrders(value as string)}
          defaultValue="today"
        >
          <SelectTrigger className="w-[180px] text-zinc-900">
            <SelectValue placeholder="Hoje" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="yesterday">Ontem</SelectItem>
            <SelectItem value="this-week">Esta semana</SelectItem>
            <SelectItem value="last-week">Semana passada</SelectItem>
            <SelectItem value="this-month">Este mês</SelectItem>
            <SelectItem value="last-month">Mês passado</SelectItem>
            <SelectItem value="last-3-months">Ultimos 3 meses</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full gap-2 md:grid-cols-3 lg:grid-cols-4">
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
                {
                  OrderStatusNames[
                    order.status as keyof typeof OrderStatusNames
                  ]
                }
              </span>
            </p>
            <p>
              Data de fechamento:{' '}
              {new Date(order.updatedAt).toLocaleDateString('pt-BR')}
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
    </>
  )
}
