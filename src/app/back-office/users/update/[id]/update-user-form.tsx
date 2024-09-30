'use client'

import { useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { updateUser } from '@/actions/users/update-user'
import { useToast } from '@/components/ui/use-toast'
import { Form } from '@/components/form'

const FormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres'),
  email: z.string().email('O email deve ser válido'),
})

type FormProps = z.infer<typeof FormSchema>

interface UpdateUserFormProps {
  user: {
    id: string
    name: string
    username: string
    email: string
  }
}

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormProps>({
    resolver: zodResolver(FormSchema),
    defaultValues: user,
  })

  async function onSubmit(data: FormProps) {
    startTransition(async () => {
      await updateUser({
        userId: user.id,
        name: data.name,
        email: data.email,
        username: data.username,
      }).then(() => {
        toast({
          title: 'Usuário atualizado com sucesso',
        })
      })
    })
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-xl bg-zinc-800 p-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Input
              {...form.register('name')}
              disabled={isPending}
              placeholder="name"
              className="text-zinc-800"
            />
            <Form.ErrorMessage field="name" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="username">Usuário</Form.Label>
            <Input
              {...form.register('username')}
              disabled={isPending}
              placeholder="username"
              className="text-zinc-800"
            />
            <Form.ErrorMessage field="username" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Input
              {...form.register('email')}
              disabled={isPending}
              placeholder="email"
              className="text-zinc-800"
            />
            <Form.ErrorMessage field="email" />
          </Form.Field>
        </div>
        <div className="flex justify-end space-x-3">
          <Button
            className="mt-3 font-bold text-zinc-50"
            type="button"
            variant="ghost"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button
            className="mt-3 bg-green-500 font-bold text-zinc-50 hover:bg-green-600"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              'Atualizar User'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
