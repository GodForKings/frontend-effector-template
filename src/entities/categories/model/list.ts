'use client'

import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { apiClient, CategoryResponseDto, getErrorMessage, toastModels } from '@/shared'

const CategoryGate = createGate<void>()

const fetchCategory = createEvent<void>()

const fetchCategoriesFx = createEffect(async () => {
  const { data } = await apiClient.categoryControllerFindAllAdmin()

  return data
})

const $categories = createStore<CategoryResponseDto[] | null>(null).on(
  fetchCategoriesFx.doneData,
  (_, allCategories) => allCategories,
)

sample({
  clock: [CategoryGate.open, fetchCategory],
  target: fetchCategoriesFx,
})

sample({
  clock: [fetchCategoriesFx.failData],
  fn: (error) => getErrorMessage(error, 'Ошибка при получении списка'),
  target: toastModels.events.showError,
})

export const categoriesModels = {
  gates: {
    CategoryGate,
  },
  events: {
    fetchCategory,
  },
  effects: {
    fetchCategoriesFx,
  },
  stores: {
    $categories,
  },
}
