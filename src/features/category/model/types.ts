import { z } from 'zod'

/** Плоская строка для отображения в таблице категорий */
export interface CategoryRow {
  id: string
  name: string
  slug: string
  image: string | null
  isActive: boolean
  sortOrder: number
  parentId: string | null
  parentName: string | null
  childrenCount: number
}

/** Состояние фильтров таблицы */
export interface CategoryFilters {
  search: string
}

export const categoryFormSchema = z.object({
  name: z.string().trim().min(1, 'Введите название'),
  slug: z
    .string()
    .trim()
    .min(1, 'Введите слаг')
    .regex(/^[a-z0-9-]+$/, 'Только латиница в нижнем регистре, цифры и дефис'),
  image: z.string(),
  parentId: z.string(),
  sortOrder: z.number().int().min(0, 'Укажите неотрицательное число'),
  isActive: z.boolean(),
})

/** Значения формы создания OR редактирования категории */
export type CategoryFormValues = z.infer<typeof categoryFormSchema>

/** Дефолтные значения для формы категории */
export const DEFAULT_CATEGORY_FORM_VALUES: CategoryFormValues = {
  name: '',
  slug: '',
  image: '',
  parentId: '',
  sortOrder: 0,
  isActive: true,
}
