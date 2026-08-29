'use client'

import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { api, getErrorMessage, toastModels } from '@/shared'

import type { BroadcastResponseDto, SendNewsletterDto } from './types'

/* 1. Ворота (Gates) */
const BroadcastsGate = createGate()

/* 2. События (Events) */
const subjectChanged = createEvent<string>()
const contentChanged = createEvent<string>()
const sendNewsletterClicked = createEvent<void>()
const resetMailForm = createEvent<void>()

/* 3. Эффекты (Effects) */
const sendNewsletterFx = createEffect(async (payload: SendNewsletterDto) => {
  const { data } = await api.post<BroadcastResponseDto>('/mail/newsletter', payload)
  return data
})

const fetchBroadcastsFx = createEffect(async () => {
  const { data } = await api.get<BroadcastResponseDto[]>('/mail/broadcasts').catch(() => ({
    data: [] as BroadcastResponseDto[],
  }))
  return data
})

/* 4. Сторы (Stores) */
const $subject = createStore('')
  .on(subjectChanged, (_, value) => value)
  .reset(resetMailForm)

const $content = createStore('')
  .on(contentChanged, (_, value) => value)
  .reset(resetMailForm)

const $sendError = createStore<string | null>(null).reset(
  subjectChanged,
  contentChanged,
  resetMailForm,
)

const $broadcasts = createStore<BroadcastResponseDto[]>([]).on(
  fetchBroadcastsFx.doneData,
  (_, data) => data,
)

const $isBroadcastsLoading = fetchBroadcastsFx.pending

/* 5. Связи и потоки данных (Samples) */
sample({
  clock: BroadcastsGate.open,
  target: fetchBroadcastsFx,
})

sample({
  clock: sendNewsletterClicked,
  source: {
    subject: $subject,
    content: $content,
  },
  filter: ({ subject, content }) => Boolean(subject.trim() && content.trim()),
  fn: ({ subject, content }) => ({ subject: subject.trim(), html: content.trim() }),
  target: sendNewsletterFx,
})

sample({
  clock: sendNewsletterClicked,
  source: {
    subject: $subject,
    content: $content,
  },
  filter: ({ subject, content }) => !subject.trim() || !content.trim(),
  fn: () => 'Заполните тему и текст рассылки',
  target: toastModels.events.showError,
})

sample({
  clock: sendNewsletterFx.doneData,
  target: [resetMailForm, fetchBroadcastsFx],
})

sample({
  clock: sendNewsletterFx.doneData,
  fn: () => 'Рассылка успешно запущена в фоновом режиме',
  target: toastModels.events.showSuccess,
})

sample({
  clock: sendNewsletterFx.failData,
  fn: (error) => getErrorMessage(error, 'Не удалось запустить рассылку'),
  target: toastModels.events.showError,
})

/* 6. Публичное пространство имен */
export const mailModels = {
  gates: {
    BroadcastsGate,
  },
  events: {
    subjectChanged,
    contentChanged,
    sendNewsletterClicked,
    resetMailForm,
  },
  stores: {
    $subject,
    $content,
    $sendError,
    $isSending: sendNewsletterFx.pending,
    $broadcasts,
    $isBroadcastsLoading,
  },
  effects: {
    sendNewsletterFx,
    fetchBroadcastsFx,
  },
}
