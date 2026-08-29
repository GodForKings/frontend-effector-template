'use client'

import { createEffect, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { apiClient, getErrorMessage, toastModels } from '@/shared'

import type { DashboardStats } from './types'

const DashboardGate = createGate()

const fetchStatsFx = createEffect(async (): Promise<DashboardStats> => {
  const [usersRes, categoriesRes, settingsRes] = await Promise.all([
    apiClient.userControllerFindAll({ page: 1, limit: 1 }).catch(() => ({ data: { total: 0 } })),
    apiClient.categoryControllerFindAll().catch(() => ({ data: [] })),
    apiClient.systemSettingControllerGetMaintenanceStatus().catch(() => ({
      data: { maintenanceMode: false, bannerEnabled: false },
    })),
  ])

  return {
    totalUsers: usersRes.data?.total ?? 0,
    totalCategories: Array.isArray(categoriesRes.data) ? categoriesRes.data.length : 0,
    maintenanceMode: settingsRes.data?.maintenanceMode ?? false,
    bannerEnabled: settingsRes.data?.bannerEnabled ?? false,
  }
})

const $stats = createStore<DashboardStats | null>(null).on(fetchStatsFx.doneData, (_, data) => data)

const $isLoading = fetchStatsFx.pending

/* При открытии страницы загружаем статистику */
sample({
  clock: DashboardGate.open,
  target: fetchStatsFx,
})

/* UI пользователю */
sample({
  clock: fetchStatsFx.failData,
  fn: (error) => getErrorMessage(error, 'Не удалось загрузить данные панели управления'),
  target: toastModels.events.showError,
})

export const dashboardModels = {
  gates: {
    DashboardGate,
  },
  stores: {
    $stats,
    $isLoading,
  },
  effects: {
    fetchStatsFx,
  },
}
