import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/back-office/orders')

  return (
    <div className="flex h-full items-center justify-center">
      <p>Redirecionando</p>
    </div>
  )
}
