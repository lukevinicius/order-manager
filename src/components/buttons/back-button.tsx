import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      className="w-full bg-red-500 font-bold text-zinc-50 hover:bg-red-600"
      type="button"
      onClick={() => router.back()}
    >
      Cancelar
    </Button>
  )
}
