'use client'

import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import {
  apiClient,
  closeDialog,
  closeModal,
  getErrorMessage,
  PAGINATION_SIZE,
  toastModels,
  UpdateUserAdminDto,
  UserAdminResponseDto,
} from '@/shared'

import type { UserFilters } from './types'

const DEFAULT_FILTERS: UserFilters = { search: '', page: 1, limit: PAGINATION_SIZE }

/* 1. Инициализация страницы и загрузка пользователей */

const UserPageGate = createGate()

const fetchUsersFx = createEffect(
  async (query: { page: number; limit: number; search?: string }) => {
    const { data } = await apiClient.userControllerFindAll({
      page: query.page,
      limit: query.limit,
      search: query.search || undefined,
    })
    return data
  },
)

const $users = createStore<UserAdminResponseDto[]>([]).on(
  fetchUsersFx.doneData,
  (_, data) => data.users,
)

/* Метаданные пагинации */
const $total = createStore<number>(0).on(fetchUsersFx.doneData, (_, data) => data.total)
const $totalPages = createStore<number>(0).on(fetchUsersFx.doneData, (_, data) => data.totalPages)

const $isListLoading = fetchUsersFx.pending

/* 2. Фильтрация и пагинация списка пользователей */

const filtersChanged = createEvent<Partial<UserFilters>>()
const pageChanged = createEvent<number>()

const $filters = createStore<UserFilters>(DEFAULT_FILTERS)

const $isMutating = createStore<boolean>(false)

/* 3. Редактирование пользователя */

const editClicked = createEvent<UserAdminResponseDto>()
const formClosed = createEvent<void>()
const formSubmitted = createEvent<UpdateUserAdminDto>()

const $editingUser = createStore<UserAdminResponseDto | null>(null)
  .on(editClicked, (_, row) => row)
  .reset(formClosed)
  .reset(closeModal)
  .reset(closeDialog)

const updateUserFx = createEffect(async ({ id, dto }: { id: string; dto: UpdateUserAdminDto }) => {
  const { data } = await apiClient.userControllerUpdate(id, dto)
  return data
})

$isMutating.on(updateUserFx.pending, (_, pending) => pending)

/* 4. Экспорт пользователей */

const downloadUsers = createEvent<void>()
const downloadUsersFx = createEffect(async () => {
  const response = await apiClient.userControllerExport()

  const blob = new Blob([response.data as unknown as BlobPart], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'users_export.csv')
  document.body.appendChild(link)
  link.click()

  link.remove()
  window.URL.revokeObjectURL(url)
})

/* Потоки данных (sample) */

// При изменении фильтров сбрасываем страницу на 1
sample({
  clock: filtersChanged,
  source: $filters,
  fn: (filters, patch) => ({ ...filters, ...patch, page: 1 }),
  target: $filters,
})

// При изменении страницы
sample({
  clock: pageChanged,
  source: $filters,
  fn: (filters, page) => ({ ...filters, page }),
  target: $filters,
})

// Инициализация загрузки при открытии страницы или изменении фильтров
sample({
  clock: [UserPageGate.open, $filters],
  source: $filters,
  fn: (filters) => ({
    page: filters.page,
    limit: filters.limit,
    search: filters.search.trim() || undefined,
  }),
  target: fetchUsersFx,
})

// Отправка формы редактирования
sample({
  clock: formSubmitted,
  source: $editingUser,
  filter: (editing): editing is UserAdminResponseDto => editing !== null,
  fn: (editing, dto) => ({ id: editing!.id, dto }),
  target: updateUserFx,
})

// Успешное обновление: рефетч списка и закрытие модалки
sample({
  clock: updateUserFx.done,
  source: $filters,
  target: [fetchUsersFx, closeModal],
})

sample({
  clock: downloadUsers,
  target: downloadUsersFx,
})

/* Тосты */

sample({
  clock: updateUserFx.done,
  fn: () => 'Данные пользователя успешно обновлены',
  target: toastModels.events.showSuccess,
})

sample({
  clock: fetchUsersFx.failData,
  fn: (error) => getErrorMessage(error, 'Не удалось загрузить пользователей'),
  target: toastModels.events.showError,
})

sample({
  clock: updateUserFx.failData,
  fn: (error) => getErrorMessage(error, 'Не удалось обновить данные пользователя'),
  target: toastModels.events.showError,
})

/* Публичное пространство имен */

export const userModels = {
  gates: {
    UserPageGate,
  },
  events: {
    filtersChanged,
    pageChanged,
    editClicked,
    formClosed,
    formSubmitted,
    downloadUsers,
  },
  stores: {
    $users,
    $total,
    $totalPages,
    $filters,
    $editingUser,
    $isListLoading,
    $isMutating,
  },
  effects: {
    fetchUsersFx,
    updateUserFx,
  },
}
