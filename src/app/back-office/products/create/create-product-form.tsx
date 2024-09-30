'use client'

import { createProduct } from '@/actions/products/create-product'
import { BackButton } from '@/components/buttons/back-button'
import { Form } from '@/components/form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  price: z.coerce.number().positive('O preço deve ser positivo'),
  description: z.string().optional(),
})

type FormProps = z.infer<typeof FormSchema>

export function CreateProductForm() {
  const { toast } = useToast()

  const FormHook = useForm<FormProps>({
    resolver: zodResolver(FormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = FormHook

  const handleCreateProduct: SubmitHandler<FormProps> = async (
    data: FormProps,
  ) => {
    const { error } = await createProduct({
      name: data.name,
      price: data.price,
      description: data.description,
    })

    if (error) {
      toast({
        title: 'Erro ao criar produto',
        description: error,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Produto criado com sucesso',
      })
    }
  }

  return (
    <FormProvider {...FormHook}>
      <form
        onSubmit={handleSubmit(handleCreateProduct)}
        className="space-y-4 rounded-xl bg-zinc-800 p-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.Input placeholder="Nome" name="name" />
            <Form.ErrorMessage field="name" />
          </Form.Field>
          {/* <Form.Field>
            <Form.Label htmlFor="description">Descrição do produto</Form.Label>
            <Form.Input name="description" />
            <Form.ErrorMessage field="description" />
          </Form.Field> */}
          <Form.Field>
            <Form.Label htmlFor="price">Preço do produto</Form.Label>
            <Form.Input placeholder="5.20" name="price" />
            <Form.ErrorMessage field="price" />
          </Form.Field>
        </div>
        <div className="flex justify-center">
          <div className="flex w-full space-x-2 md:max-w-60">
            <BackButton />
            <Button
              className="mt-auto w-full bg-emerald-600 font-bold hover:bg-emerald-700"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                'Criar produto'
              )}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
