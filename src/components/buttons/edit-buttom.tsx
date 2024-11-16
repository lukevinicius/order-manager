import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

interface EditButtomProps {
  href: string
}

export function EditButton({ href }: EditButtomProps) {
  return (
    <Link href={href} className="w-full">
      <Button
        size="sm"
        className="flex w-full space-x-2 bg-yellow-500/90 font-semibold hover:bg-yellow-500/70"
      >
        <Pencil size={16} />
        <span>Editar</span>
      </Button>
    </Link>
  )
}
