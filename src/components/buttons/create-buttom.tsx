'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface CreateButtonProps {
  href: string
  title: string
}

export function CreateButton({ href, title }: CreateButtonProps) {
  const router = useRouter()

  return (
    <Button
      className="bg-emerald-600 font-bold hover:bg-emerald-700"
      onClick={() => {
        router.push(href)
      }}
    >
      {title}
    </Button>
  )
}
