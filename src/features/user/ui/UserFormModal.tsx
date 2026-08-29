'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useUnit } from 'effector-react'
import { type FC, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { cn, InfoBlock } from '@/shared'
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@/shared/ui/shadcn'

import { userModels } from '../model/list'
import { DEFAULT_USER_FORM_VALUES, userFormSchema } from '../model/types'

export const UserFormModal: FC = () => {
  const [editing, loading, formSubmitted] = useUnit([
    userModels.stores.$editingUser,
    userModels.stores.$isMutating,
    userModels.events.formSubmitted,
  ])

  const formValues = useMemo(() => {
    if (editing) {
      return {
        name: editing.name ?? '',
        phone: editing.phone ?? '',
        role: editing.role,
        isBanned: editing.isBanned,
      }
    }
    return DEFAULT_USER_FORM_VALUES
  }, [editing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userFormSchema),
    values: formValues,
    mode: 'onChange',
  })

  const handleFormSubmit = handleSubmit((values) => {
    formSubmitted({
      name: values.name || undefined,
      phone: values.phone || undefined,
      role: values.role,
      isBanned: values.isBanned,
    })
  })

  if (!editing) return null

  return (
    <div className={cn('p-6 flex flex-col gap-6')}>
      <InfoBlock
        title='Редактировать пользователя'
        paragraph={`Изменение учетной записи «${editing.email}»`}
      />

      <form className={cn('flex flex-col gap-4')} onSubmit={handleFormSubmit}>
        {/* Имя */}
        <div className={cn('flex flex-col gap-2')}>
          <Label htmlFor='user-name'>Имя</Label>

          <Input
            id='user-name'
            type='text'
            placeholder='Иван Иванов'
            disabled={loading}
            {...register('name')}
            aria-invalid={!!errors.name}
          />

          {errors.name && (
            <span className={cn('text-xs text-destructive')}>{errors.name.message}</span>
          )}
        </div>

        {/* Телефон */}
        <div className={cn('flex flex-col gap-2')}>
          <Label htmlFor='user-phone'>Телефон</Label>

          <Input
            id='user-phone'
            type='text'
            placeholder='+79991234567'
            disabled={loading}
            {...register('phone')}
            aria-invalid={!!errors.phone}
          />

          {errors.phone && (
            <span className={cn('text-xs text-destructive')}>{errors.phone.message}</span>
          )}
        </div>

        {/* Роль */}
        <div className={cn('flex flex-col gap-2')}>
          <Label htmlFor='user-role'>Роль пользователя</Label>

          <Controller
            name='role'
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} disabled={loading}>
                <SelectTrigger id='user-role' className={cn('w-full bg-card')}>
                  <SelectValue placeholder='Выберите роль' />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='USER'>USER</SelectItem>

                  <SelectItem value='ADMIN'>ADMIN</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.role && (
            <span className={cn('text-xs text-destructive')}>{errors.role.message}</span>
          )}
        </div>

        {/* Статус блокировки */}
        <div
          className={cn(
            'flex items-center justify-between',
            'rounded-lg border border-border p-4 bg-transparent',
            'mt-2',
          )}
        >
          <div className={cn('flex flex-col gap-0.5')}>
            <Label htmlFor='user-banned' className={cn('cursor-pointer')}>
              Заблокирован
            </Label>

            <p className={cn('text-xs text-muted-foreground')}>
              Заблокированные пользователи не смогут войти в систему
            </p>
          </div>

          <Controller
            name='isBanned'
            control={control}
            render={({ field }) => (
              <Switch
                id='user-banned'
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={loading}
              />
            )}
          />
        </div>

        {/* Кнопки */}
        <div className={cn('flex items-center justify-end gap-3', 'mt-4')}>
          <Button type='submit' isLoading={loading}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}
