import { InputHTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'

interface CreateButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function CreateDialogButton({ title }: CreateButtonProps) {
  return (
    <Button className="bg-emerald-600 font-bold hover:bg-emerald-700">
      {title}
    </Button>
  )
}
