'use client'

import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Loading from '../global/loading'
import { useToast } from '../ui/use-toast'
import { FunnelPage } from '@prisma/client'
import { FunnelPageSchema } from '@/lib/types'
import {
  deleteFunnelPage,
  getFunnels,
  saveActivityLogsNotification,
  upsertFunnelPage,
} from '@/lib/queries'
import { useRouter } from 'next/navigation'
import { v4 } from 'uuid'
import { CopyPlusIcon, Trash } from 'lucide-react'
import { useModal } from '@/providers/modal-provider'

interface CreateFunnelPageProps {
  defaultData?: FunnelPage
  funnelId: string
  order: number
  subaccountId: string
}

const CreateFunnelPage: React.FC<CreateFunnelPageProps> = ({
  defaultData,
  funnelId,
  order,
  subaccountId,
}) => {
  const { setClose } = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof FunnelPageSchema>>({
    resolver: zodResolver(FunnelPageSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      pathName: '',
    },
  })

  useEffect(() => {
    if (defaultData) {
      form.reset({
        name: defaultData.name || '',
        pathName: defaultData.pathName || '',
      })
    }
  }, [defaultData, form])

  const onSubmit = async (values: z.infer<typeof FunnelPageSchema>) => {
    if (order !== 0 && !values.pathName) {
      return form.setError('pathName', {
        message:
          "Pages other than the first page in the funnel require a path name (e.g., 'secondstep').",
      })
    }

    try {
      const response = await upsertFunnelPage(
        subaccountId,
        {
          ...values,
          id: defaultData?.id || v4(),
          order: defaultData?.order || order,
          pathName: values.pathName || '',
        },
        funnelId
      )

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a funnel page | ${response?.name}`,
        subaccountId,
      })

      toast({
        title: 'Success',
        description: 'Saved Funnel Page Details',
      })

      router.replace(`/subaccount/${subaccountId}/funnels/${funnelId}`)
      setClose()
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'Could not save Funnel Page details.',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel Page</CardTitle>
        <CardDescription>
          Funnel pages follow the order they are created in. You can reorder them as needed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Page name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pathName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Path Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Path for the page" {...field} value={field.value?.toLowerCase()} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-22 self-end">
                {form.formState.isSubmitting ? <Loading /> : 'Save Page'}
              </Button>

              {defaultData?.id && (
                <>
                  <Button
                    type="button"
                    onClick={async () => {
                      setIsLoading(true)
                      const response = await deleteFunnelPage(defaultData.id)
                      await saveActivityLogsNotification({
                        agencyId: undefined,
                        description: `Deleted a funnel page | ${response?.name}`,
                        subaccountId,
                      })
                      router.refresh()
                      setIsLoading(false)
                    }}
                    variant="outline"
                    className="w-22 self-end border-destructive text-destructive hover:bg-destructive"
                  >
                    {isLoading ? <Loading /> : <Trash />}
                  </Button>

                  <Button
                    type="button"
                    onClick={async () => {
                      setIsLoading(true)
                      const response = await getFunnels(subaccountId)
                      const lastOrder = response.find(funnel => funnel.id === funnelId)?.FunnelPages.length || 0

                      await upsertFunnelPage(
                        subaccountId,
                        {
                          ...defaultData,
                          id: v4(),
                          order: lastOrder,
                          visits: 0,
                          name: `${defaultData.name} Copy`,
                          pathName: `${defaultData.pathName}copy`,
                          content: defaultData.content,
                        },
                        funnelId
                      )
                      toast({
                        title: 'Success',
                        description: 'Copied Funnel Page successfully.',
                      })
                      router.refresh()
                      setIsLoading(false)
                    }}
                    variant="outline"
                    size="icon"
                  >
                    {isLoading ? <Loading /> : <CopyPlusIcon />}
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreateFunnelPage
