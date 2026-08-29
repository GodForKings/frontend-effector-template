'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useUnit } from 'effector-react'
import { ChangeEvent, type FC, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { cn, slugify } from '@/shared'
import { FileUpload } from '@/shared/ui'
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

import { categoryModels } from '../model/list'
import type { CategoryFormValues } from '../model/types'
import { categoryFormSchema, DEFAULT_CATEGORY_FORM_VALUES } from '../model/types'

export const CategoryForm: FC = () => {
  const [editing, categories, loading, formSubmitted] = useUnit([
    categoryModels.stores.$editingCategory,
    categoryModels.stores.$categories,
    categoryModels.stores.$isMutating,
    categoryModels.events.formSubmitted,
  ])

  const isEdit = editing !== null

  const formValues = useMemo<CategoryFormValues>(() => {
    if (editing) {
      return {
        name: editing.name,
        slug: editing.slug,
        image: editing.image ?? '',
        parentId: editing.parentId ?? '',
        sortOrder: editing.sortOrder,
        isActive: editing.isActive,
      }
    }
    return DEFAULT_CATEGORY_FORM_VALUES
  }, [editing])

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    values: formValues,
    mode: 'onChange',
  })

  const handleFormSubmit = handleSubmit((values) => {
    formSubmitted(values)
  })

  const parentOptions = categories.filter(
    (category) => category.id !== editing?.id && category.parentId === null,
  )

  return (
    <div className='p-6 flex flex-col gap-1'>
      <h2 className='text-lg font-semibold'>
        {isEdit ? 'Редактировать категорию' : 'Создать категорию'}
      </h2>

      <p className='text-sm text-muted-foreground mb-3'>
        {isEdit ? `Изменение: ${editing.name}` : 'Заполните поля для новой категории'}
      </p>

      <form className='flex flex-col gap-4' onSubmit={handleFormSubmit}>
        {/* Название */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='cat-name'>Название</Label>

          <Input
            id='cat-name'
            placeholder='Платья и сарафаны'
            disabled={loading}
            {...register('name', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                if (!isEdit) {
                  setValue('slug', slugify(e.target.value), {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  })
                }
              },
            })}
          />

          {errors.name && <p className='text-xs text-destructive'>{errors.name.message}</p>}
        </div>

        {/* Слаг */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='cat-slug'>Слаг (URL)</Label>

          <Input
            id='cat-slug'
            placeholder='platya-i-sarafany'
            disabled={loading}
            {...register('slug')}
          />

          {errors.slug && <p className='text-xs text-destructive'>{errors.slug.message}</p>}
        </div>

        {/* Изображение категории */}
        <div className='flex flex-col gap-2'>
          <Label>Изображение категории</Label>

          <Controller
            name='image'
            control={control}
            render={({ field }) => (
              <FileUpload
                type='image'
                className='w-1/2 md:w-1/3'
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={loading}
                autoDeleteOnRemove={!isEdit}
              />
            )}
          />

          {errors.image && <p className='text-xs text-destructive'>{errors.image.message}</p>}
        </div>

        {/* Родительская категория */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='cat-parent'>Родительская категория</Label>

          <Controller
            name='parentId'
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || 'none'}
                onValueChange={(val) => field.onChange(val === 'none' ? '' : val)}
                disabled={loading}
              >
                <SelectTrigger id='cat-parent' className='w-full'>
                  <SelectValue placeholder='— Корневая категория —' />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='none'>— Корневая категория —</SelectItem>
                  {parentOptions.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Порядок сортировки */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='cat-sort'>Порядок сортировки</Label>

          <Input
            id='cat-sort'
            type='number'
            min={0}
            disabled={loading}
            {...register('sortOrder', { valueAsNumber: true })}
          />

          {errors.sortOrder && (
            <p className='text-xs text-destructive'>{errors.sortOrder.message}</p>
          )}
        </div>

        {/* Статус активности */}
        <div
          className={cn(
            'flex items-center justify-between',
            'rounded-lg border border-border p-4 bg-transparent',
          )}
        >
          <div className='flex flex-col gap-0.5'>
            <Label htmlFor='cat-active' className='cursor-pointer'>
              Активна
            </Label>

            <p className='text-xs text-muted-foreground'>Неактивные категории скрыты в каталоге</p>
          </div>

          <Controller
            name='isActive'
            control={control}
            render={({ field }) => (
              <Switch
                id='cat-active'
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={loading}
              />
            )}
          />
        </div>

        {/* Кнопки */}
        <div className='flex items-center justify-end gap-3 pt-2'>
          <Button type='submit' isLoading={loading}>
            {isEdit ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </div>
  )
}
