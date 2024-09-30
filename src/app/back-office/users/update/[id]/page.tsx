import { getUserById } from '@/actions/users/get-user-by-id'
import { UpdateUserForm } from './update-user-form'

interface UpdateUserProps {
  params: {
    id: string
  }
}

export default async function UpdateUser({ params }: UpdateUserProps) {
  const { user } = await getUserById({
    userId: params.id,
  })

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Edição do usuário</p>
      </div>
      {user && <UpdateUserForm user={user} />}
    </div>
  )
}
