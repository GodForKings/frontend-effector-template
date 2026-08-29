'use client'

import { useGate, useUnit } from 'effector-react'
import { Loader2 } from 'lucide-react'
import type { ComponentProps, FC } from 'react'

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
  Separator,
  Switch,
  Textarea,
} from '@/shared/ui/shadcn'

import { settingsModels } from '../model/settings'

export const SettingsForm: FC = () => {
  useGate(settingsModels.gates.settingsGate)

  const [form, hasChanges, isPending, changeFields, submitSave] = useUnit([
    settingsModels.stores.$settingsForm,
    settingsModels.stores.$hasChanges,
    settingsModels.stores.$isPending,
    settingsModels.events.formFieldsChanged,
    settingsModels.events.saveSubmitted,
  ])

  const handleSubmit: NonNullable<ComponentProps<'form'>['onSubmit']> = (e) => {
    e.preventDefault()
    submitSave()
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Режим обслуживания</CardTitle>

          <CardDescription>
            Управление техническим состоянием и доступностью сайта для обычных пользователей
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <Label className='text-base' htmlFor='maintenance-mode'>
                Режим технических работ
              </Label>

              <div className='text-sm text-muted-foreground'>
                Блокирует доступ к сайту для всех пользователей, кроме администраторов
              </div>
            </div>

            <Switch
              disabled={isPending}
              id='maintenance-mode'
              checked={form.maintenanceMode}
              onCheckedChange={(checked) => changeFields({ maintenanceMode: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Информационный баннер</CardTitle>

          <CardDescription>
            Настройка публичного баннера для уведомления пользователей о предстоящих событиях или
            работах
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <Label className='text-base' htmlFor='banner-enabled'>
                Отображать баннер
              </Label>

              <div className='text-sm text-muted-foreground'>
                Включает или выключает показ баннера в верхней части сайта
              </div>
            </div>

            <Switch
              disabled={isPending}
              id='banner-enabled'
              checked={form.bannerEnabled}
              onCheckedChange={(checked) => changeFields({ bannerEnabled: checked })}
            />
          </div>

          {form.bannerEnabled && (
            <>
              <Separator />

              <div className='space-y-2'>
                <Label htmlFor='banner-text'>Текст уведомления</Label>

                <Textarea
                  disabled={isPending}
                  id='banner-text'
                  value={form.bannerText}
                  onChange={(e) => changeFields({ bannerText: e.target.value })}
                  placeholder='Введите сообщение для баннера'
                  rows={3}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='banner-link'>Ссылка баннера (необязательно)</Label>

                <Input
                  disabled={isPending}
                  id='banner-link'
                  type='text'
                  value={form.bannerLink}
                  onChange={(e) => changeFields({ bannerLink: e.target.value })}
                  placeholder='https://example.com/more-info'
                />
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className='border-t'>
          <Button disabled={isPending || !hasChanges} type='submit' className='gap-2'>
            {isPending ? <Loader2 className='size-4 animate-spin' /> : 'Сохранить настройки'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
