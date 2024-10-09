import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { UpdateOrderContent } from './content'
import { Suspense } from 'react'

interface UpdateOrderDialogProps {
  orderId: string
}

export async function UpdateOrderDialog({ orderId }: UpdateOrderDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="mt-2 w-full">Detalhes</Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-zinc-900 text-zinc-50 sm:max-w-3xl">
        <Suspense fallback="Carregando...">
          <UpdateOrderContent orderId={orderId} />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
