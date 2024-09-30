'use client'

import { createUser } from '@/actions/users/create-user'
import { Form } from '@/components/form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres'),
  email: z.string().email('O email deve ser válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type FormProps = z.infer<typeof FormSchema>

export function CreateUserForm() {
  const { toast } = useToast()
  const router = useRouter()
  const createUserForm = useForm<FormProps>({
    resolver: zodResolver(FormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createUserForm

  const handleCreateUser: SubmitHandler<FormProps> = async (
    data: FormProps,
  ) => {
    const { error } = await createUser({
      email: data.email,
      name: data.name,
      username: data.username,
      role: 'ADMINISTRATOR',
      password: data.password,
      document: '',
      phone: '',
    })

    if (error) {
      toast({
        title: 'Erro ao criar usuário',
        description: error,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Usuário criado com sucesso',
      })

      router.push('/back-office/users')
    }
  }

  return (
    <FormProvider {...createUserForm}>
      <form
        onSubmit={handleSubmit(handleCreateUser)}
        className="rounded-xl bg-zinc-800 p-3"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.Input placeholder="Nome" name="name" />
            <Form.ErrorMessage field="name" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="username">Usuário</Form.Label>
            <Form.Input placeholder="Usuário" name="username" />
            <Form.ErrorMessage field="username" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input placeholder="Email" name="email" />
            <Form.ErrorMessage field="email" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Input
              placeholder="Sua senha"
              type="password"
              name="password"
            />
            <Form.ErrorMessage field="password" />
          </Form.Field>
        </div>
        <div className="flex justify-end space-x-3">
          <Button
            className="mt-3 bg-red-500 font-bold text-zinc-50 hover:bg-red-600"
            type="button"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button
            className="mt-3 bg-green-500 font-bold text-zinc-50 hover:bg-green-600"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              'Criar usuário'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
