import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { Suspense } from 'react'
import { UpdateProductContent } from './content'
import { Pencil } from 'lucide-react'

interface UpdateProductDialogProps {
  productId: string
}

export async function UpdateProductDialog({
  productId,
}: UpdateProductDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button
          size="sm"
          className="flex w-full space-x-2 bg-yellow-500/90 font-semibold hover:bg-yellow-500/70"
        >
          <Pencil size={16} />
          <span>Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-zinc-900 text-zinc-50 sm:max-w-3xl">
        <Suspense fallback="Carregando...">
          <UpdateProductContent productId={productId} />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
