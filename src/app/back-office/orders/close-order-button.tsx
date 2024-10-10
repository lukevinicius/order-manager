'use client'

import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'
import { closeOrder } from '@/actions/orders/close-order'
import { useToast } from '@/components/ui/use-toast'

export function CloseOrderButton({ orderId }: { orderId: string }) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  function handleAction() {
    startTransition(async () => {
      const { error } = await closeOrder(orderId)

      if (error) {
        toast({
          title: 'Erro ao fechar pedido',
          description: error,
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full bg-red-600 text-zinc-50 hover:bg-red-600/85">
          Fechar pedido
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-zinc-900 text-zinc-50 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deseja fechar o pedido?</DialogTitle>
        </DialogHeader>
        <DialogClose className="flex space-x-2">
          <Button
            className="w-full bg-red-600 text-zinc-50 hover:bg-red-600/85"
            onClick={handleAction}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              'Fechar pedido'
            )}
          </Button>
          <Button
            className="w-full bg-zinc-600 text-zinc-50 hover:bg-zinc-600/85"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              'Cancelar'
            )}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
