import { getProductById } from '@/actions/users/get-user-by-id'
import { UpdateProductForm } from './update-form'

interface UpdateProductProps {
  params: {
    id: string
  }
}

export default async function UpdateProduct({ params }: UpdateProductProps) {
  const { user } = await getProductById({
    userId: params.id,
  })

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Edição do usuário</p>
      </div>
      {user && <UpdateProductForm user={user} />}
    </div>
  )
}
