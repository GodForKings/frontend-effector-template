'use client'

import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { apiClient, getErrorMessage, toastModels } from '@/shared'

import { DEFAULT_SETTINGS_FORM, type SettingsFormValues } from './types'

/* Gate для загрузки при монтировании */
const settingsGate = createGate<void>()

/* Эвенты */
const formFieldsChanged = createEvent<Partial<SettingsFormValues>>()
const saveSubmitted = createEvent<void>()

/* Эффекты */
const fetchSettingsFx = createEffect(async () => {
  const { data } = await apiClient.systemSettingControllerGetMaintenanceStatus()
  return data
})

const updateSettingsFx = createEffect(async (dto: SettingsFormValues) => {
  const { data } = await apiClient.systemSettingControllerUpdateMaintenanceStatus(dto)
  return data
})

/* Исходные данные с сервера для проверки наличия изменений */
const $initialSettings = createStore<SettingsFormValues | null>(null)

/* Стор единой формы */
const $settingsForm = createStore<SettingsFormValues>(DEFAULT_SETTINGS_FORM).on(
  formFieldsChanged,
  (state, patch) => ({ ...state, ...patch }),
)

const $hasChanges = combine($initialSettings, $settingsForm, (initial, current) => {
  if (!initial) return false
  return (
    initial.maintenanceMode !== current.maintenanceMode ||
    initial.bannerEnabled !== current.bannerEnabled ||
    initial.bannerText !== current.bannerText ||
    initial.bannerLink !== current.bannerLink
  )
})

const $isPending = combine(
  fetchSettingsFx.pending,
  updateSettingsFx.pending,
  (fetching, updating) => fetching || updating,
)

/* 1. Обновление сторов при загрузке или сохранении через sample */
sample({
  clock: [fetchSettingsFx.doneData, updateSettingsFx.doneData],
  fn: (data) => ({
    maintenanceMode: data.maintenanceMode,
    bannerEnabled: data.bannerEnabled,
    bannerText: data.bannerText,
    bannerLink: data.bannerLink,
  }),
  target: [$initialSettings, $settingsForm],
})

/* 2. Запрос настроек при открытии Gate */
sample({
  clock: settingsGate.open,
  target: fetchSettingsFx,
})

/* 3. Отправка формы при сабмите (берёт данные из $settingsForm) */
sample({
  clock: saveSubmitted,
  source: $settingsForm,
  target: updateSettingsFx,
})

/* 4. Уведомление об успешном обновлении */
sample({
  clock: updateSettingsFx.done,
  fn: () => 'Настройки успешно сохранены',
  target: toastModels.events.showSuccess,
})

/* 5. Обработка ошибок при загрузке или сохранении */
sample({
  clock: fetchSettingsFx.failData,
  fn: (error) => getErrorMessage(error, 'Не удалось загрузить настройки'),
  target: toastModels.events.showError,
})

sample({
  clock: updateSettingsFx.failData,
  fn: (error) => getErrorMessage(error, 'Не удалось сохранить настройки'),
  target: toastModels.events.showError,
})

/* Единое пространство имен для экспорта */
export const settingsModels = {
  gates: {
    settingsGate,
  },
  events: {
    formFieldsChanged,
    saveSubmitted,
  },
  stores: {
    $settingsForm,
    $hasChanges,
    $isPending,
  },
  effects: {
    fetchSettingsFx,
    updateSettingsFx,
  },
}
