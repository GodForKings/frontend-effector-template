'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useGate, useUnit } from 'effector-react'
import { Edit, Eye, History, Loader2, Mail } from 'lucide-react'
import { type FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { mailModels } from '@/entities'
import { cn, InfoBlock } from '@/shared'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui/shadcn'

import { type ActiveTab, type BroadcastFormValues, broadcastSchema } from '../model/types'
import { BroadcastEditor } from './BroadcastEditor'
import { BroadcastHistoryTable } from './BroadcastHistoryTable'
import { BroadcastPreview } from './BroadcastPreview'

export const BroadcastPage: FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('edit')

  useGate(mailModels.gates.BroadcastsGate)

  const [
    subject,
    content,
    isSending,
    subjectChanged,
    contentChanged,
    resetMailForm,
    sendNewsletterClicked,
  ] = useUnit([
    mailModels.stores.$subject,
    mailModels.stores.$content,
    mailModels.stores.$isSending,
    mailModels.events.subjectChanged,
    mailModels.events.contentChanged,
    mailModels.events.resetMailForm,
    mailModels.events.sendNewsletterClicked,
  ])

  const form = useForm<BroadcastFormValues>({
    resolver: zodResolver(broadcastSchema),
    values: {
      subject,
      content,
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form

  const isContentEmpty = !content || content.replace(/<[^>]*>/g, '').trim().length === 0

  const onSubmit = () => {
    sendNewsletterClicked()
    setActiveTab('edit')
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as ActiveTab)
  }

  return (
    <div className='flex flex-col gap-5'>
      <InfoBlock
        title='Рассылка писем'
        paragraph='Создание и отправка email-уведомлений для всех пользователей с ролью USER'
      />

      <Tabs value={activeTab} onValueChange={handleTabChange} className='w-full'>
        <TabsList className={cn('grid grid-cols-3', 'max-w-200 w-full')}>
          <TabsTrigger value='edit'>
            <Edit className='size-4' />
            Редактор
          </TabsTrigger>

          <TabsTrigger value='preview'>
            <Eye className='size-4' />
            Превью
          </TabsTrigger>

          <TabsTrigger value='history'>
            <History className='size-4' />
            История
          </TabsTrigger>
        </TabsList>

        {/* Вкладка редактирования */}
        <TabsContent value='edit'>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <Card>
              <CardHeader>
                <CardTitle>Новая рассылка</CardTitle>

                <CardDescription>
                  Заполните тему и содержимое письма. Рассылка будет отправлена всем
                  зарегистрированным пользователям.
                </CardDescription>
              </CardHeader>

              <CardContent className='flex flex-col gap-4'>
                <div className='space-y-2 flex flex-col'>
                  <Label htmlFor='subject'>Тема письма</Label>

                  <Controller
                    name='subject'
                    control={control}
                    render={({ field }) => (
                      <Input
                        id='subject'
                        placeholder='Введите тему письма...'
                        disabled={isSending}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value)
                          subjectChanged(e.target.value)
                        }}
                      />
                    )}
                  />

                  {errors.subject && (
                    <p className='text-sm text-destructive'>{errors.subject.message}</p>
                  )}
                </div>

                <div className='space-y-2 flex flex-col'>
                  <Label htmlFor='content'>Содержимое письма</Label>

                  <Controller
                    name='content'
                    control={control}
                    render={({ field }) => (
                      <BroadcastEditor
                        id='content'
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val)
                          contentChanged(val)
                        }}
                        disabled={isSending}
                      />
                    )}
                  />

                  {errors.content && (
                    <p className='text-sm text-destructive'>{errors.content.message}</p>
                  )}
                </div>
              </CardContent>

              <CardFooter
                className={cn(
                  'border-t',
                  'justify-between gap-4 max-md:items-start max-md:flex-col-reverse',
                )}
              >
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setActiveTab('preview')}
                  disabled={isContentEmpty}
                >
                  Посмотреть превью
                </Button>

                <div className='flex gap-2'>
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={resetMailForm}
                    disabled={isSending}
                  >
                    Очистить
                  </Button>

                  <Button
                    type='submit'
                    disabled={isSending}
                    className={cn(
                      'px-6 py-2',
                      'bg-primary text-primary-foreground hover:bg-primary/95',
                    )}
                  >
                    {isSending ? (
                      <>
                        <Loader2 className='animate-spin mr-2 size-4' />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Mail className='mr-2 size-4' />
                        Запустить рассылку
                      </>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Вкладка предпросмотра */}
        <TabsContent value='preview'>
          <BroadcastPreview
            subject={subject}
            content={content}
            onBackToEdit={() => setActiveTab('edit')}
          />
        </TabsContent>

        {/* Вкладка истории */}
        <TabsContent value='history'>
          <BroadcastHistoryTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
