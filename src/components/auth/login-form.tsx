'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { login } from '@/actions/login'
import { LoginSchema, LoginSchemaType } from '@/schemas/login'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form/form-error'
import { useToast } from '@/components/ui/use-toast'
import { Form } from '../form'
import { Label } from '@/components/ui/label'

export function LoginForm() {
  const { replace } = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState<string | undefined>(undefined)
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const { handleSubmit } = form

  const onSubmit: SubmitHandler<LoginSchemaType> = async (values) => {
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error)

        if (!data.error) {
          toast({
            title: 'Bem vindo! 🎉',
            description: 'Você está logado com sucesso.',
            duration: 3000,
          })
          replace('/back-office/orders')
        }
      })
    })
  }

  return (
    <CardWrapper headerLabel="Welcome back">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Form.Field>
              <Label htmlFor="username" className="text-zinc-800">
                Username
              </Label>
              <Form.Input
                name="username"
                disabled={isPending}
                placeholder="username"
              />
              <Form.ErrorMessage field="username" />
            </Form.Field>
            <Form.Field>
              <Label htmlFor="password" className="text-zinc-800">
                Password
              </Label>
              <Form.Input
                name="password"
                type="password"
                disabled={isPending}
                placeholder="password"
              />
              <Form.ErrorMessage field="password" />
            </Form.Field>
          </div>
          {error && <FormError message={error} />}
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </FormProvider>
    </CardWrapper>
  )
}
