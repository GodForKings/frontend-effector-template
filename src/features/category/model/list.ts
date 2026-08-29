'use client'

import { combine, createEffect, createEvent, createStore, sample } from 'effector'

import { categoriesModels } from '@/entities'
import {
  apiClient,
  closeDialog,
  closeModal,
  type CreateCategoryDto,
  getErrorMessage,
  openConfirmDialog,
  toastModels,
  type UpdateCategoryDto,
} from '@/shared'

import { flattenCategories } from '../lib/formatters'
import type { CategoryFilters, CategoryFormValues, CategoryRow } from './types'

/* Events */
const filtersChanged = createEvent<Partial<CategoryFilters>>()
const createClicked = createEvent()
const editClicked = createEvent<CategoryRow>()
const deleteClicked = createEvent<CategoryRow>()
const deleteConfirmed = createEvent()
const formSubmitted = createEvent<CategoryFormValues>()
const formClosed = createEvent()

/* Effects */
const createCategoryFx = createEffect(async (dto: CreateCategoryDto) => {
  const response = await apiClient.categoryControllerCreate(dto)
  return response.data
})

const updateCategoryFx = createEffect(
  async ({ id, dto }: { id: string; dto: UpdateCategoryDto }) => {
    const response = await apiClient.categoryControllerUpdate(id, dto)
    return response.data
  },
)

const deleteCategoryFx = createEffect(async (id: string) => {
  await apiClient.categoryControllerRemove(id)
})

/* Stores */
const $categories = combine(categoriesModels.stores.$categories, (data) =>
  data ? flattenCategories(data) : [],
)

const $filters = createStore<CategoryFilters>({ search: '' }).on(filtersChanged, (prev, patch) => ({
  ...prev,
  ...patch,
}))

const $filteredCategories = combine($categories, $filters, (categories, filters) => {
  const query = filters.search.trim().toLowerCase()

  if (!query) return categories
  return categories.filter(
    (category) =>
      category.name.toLowerCase().includes(query) ||
      category.slug.toLowerCase().includes(query) ||
      (category.parentName?.toLowerCase().includes(query) ?? false),
  )
})

const $isLoading = categoriesModels.effects.fetchCategoriesFx.pending

const $isMutating = combine(
  createCategoryFx.pending,
  updateCategoryFx.pending,
  deleteCategoryFx.pending,
  (a, b, c) => a || b || c,
)

/** null = режим создания, CategoryRow = режим редактирования */
const $editingCategory = createStore<CategoryRow | null>(null)
  .on(editClicked, (_, row) => row)
  .reset(formClosed)
  .reset(closeDialog)

/** Категория, выбранная для удаления */
const $deletingCategory = createStore<CategoryRow | null>(null)
  .on(deleteClicked, (_, row) => row)
  .reset(formClosed)
  .reset(closeModal)

/* Flows */

// Создание или обновление по formSubmitted
sample({
  clock: formSubmitted,
  source: $editingCategory,
  filter: (editing) => editing === null,
  fn: (_, values): CreateCategoryDto => ({
    name: values.name,
    slug: values.slug,
    image: values.image || undefined,
    parentId: values.parentId || undefined,
    sortOrder: values.sortOrder,
    isActive: values.isActive,
  }),
  target: createCategoryFx,
})

sample({
  clock: formSubmitted,
  source: $editingCategory,
  filter: (editing): editing is CategoryRow => editing !== null,
  fn: (editing: CategoryRow, values) => ({
    id: editing.id,
    dto: {
      name: values.name,
      slug: values.slug,
      image: values.image || undefined,
      parentId: values.parentId || undefined,
      sortOrder: values.sortOrder,
      isActive: values.isActive,
    } satisfies UpdateCategoryDto,
  }),
  target: updateCategoryFx,
})

// Открытие Confirm Dialog при deleteClicked
sample({
  clock: deleteClicked,
  fn: (category) => ({
    title: `Удалить категорию «${category.name}»?`,
    description:
      'Все привязанные товары и подкатегории останутся без категории. Это действие необратимо.',
    variant: 'destructive' as const,
    confirmText: 'Удалить',
    cancelText: 'Отмена',
    onConfirm: deleteConfirmed,
  }),
  target: openConfirmDialog,
})

// Удаление по подтверждению
sample({
  clock: deleteConfirmed,
  source: $deletingCategory,
  filter: (row): row is CategoryRow => row !== null,
  fn: (row: CategoryRow) => row.id,
  target: deleteCategoryFx,
})

/* После успешной мутации - закрыть форму/модал + перезагрузить список */
sample({
  clock: [createCategoryFx.done, updateCategoryFx.done, deleteCategoryFx.done],
  target: [formClosed, categoriesModels.effects.fetchCategoriesFx],
})

/* formClosed закрывает оба виджета */
sample({
  clock: formClosed,
  target: [closeDialog, closeModal],
})

/* UI юзера */

sample({
  clock: createCategoryFx.doneData,
  fn: () => 'Категория успешно создана',
  target: toastModels.events.showSuccess,
})

sample({
  clock: updateCategoryFx.doneData,
  fn: () => 'Категория успешно обновлена',
  target: toastModels.events.showSuccess,
})

sample({
  clock: deleteCategoryFx.done,
  fn: () => 'Категория удалена',
  target: toastModels.events.showSuccess,
})

sample({
  clock: createCategoryFx.failData,
  fn: (error) => getErrorMessage(error, 'Не удалось создать категорию'),
  target: toastModels.events.showError,
})

sample({
  clock: updateCategoryFx.failData,
  fn: (error) => getErrorMessage(error, 'Не удалось обновить категорию'),
  target: toastModels.events.showError,
})

sample({
  clock: deleteCategoryFx.failData,
  fn: (error) => getErrorMessage(error, 'Не удалось удалить категорию'),
  target: toastModels.events.showError,
})

export const categoryModels = {
  events: {
    filtersChanged,
    createClicked,
    editClicked,
    deleteClicked,
    deleteConfirmed,
    formSubmitted,
    formClosed,
  },
  stores: {
    $categories,
    $filters,
    $filteredCategories,
    $isLoading,
    $isMutating,
    $editingCategory,
    $deletingCategory,
  },
  effects: {
    fetchCategoriesFx: categoriesModels.effects.fetchCategoriesFx,
    createCategoryFx,
    updateCategoryFx,
    deleteCategoryFx,
  },
}
