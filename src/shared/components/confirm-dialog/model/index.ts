import { createEffect, createEvent, createStore, sample } from 'effector'

import type { ConfirmCallback, ConfirmState, OpenConfirmOptions } from './types'

export const openConfirmDialog = createEvent<OpenConfirmOptions>()
export const closeConfirmDialog = createEvent()
export const confirmClicked = createEvent()

const CLEAR_STATE: ConfirmState = {
  isOpen: false,
  title: '',
  description: undefined,
  confirmText: 'Подтвердить',
  cancelText: 'Отмена',
  variant: 'default',
  isLoading: false,
  onConfirm: null,
}

export const $confirmState = createStore<ConfirmState>(CLEAR_STATE)
  .on(openConfirmDialog, (_, options) => ({
    isOpen: true,
    title: options.title,
    description: options.description,
    confirmText:
      options.confirmText ?? (options.variant === 'destructive' ? 'Удалить' : 'Подтвердить'),
    cancelText: options.cancelText ?? 'Отмена',
    variant: options.variant ?? 'default',
    isLoading: false,
    onConfirm: options.onConfirm,
  }))
  .on(closeConfirmDialog, () => CLEAR_STATE)

const executeConfirmFx = createEffect((callback: ConfirmCallback) => {
  if (typeof callback === 'function') {
    callback()
  }
})

/* При подтверждении вызываем целевой коллбэк/событие через createEffect */
sample({
  clock: confirmClicked,
  source: $confirmState.map((state) => state.onConfirm),
  filter: (callback): callback is ConfirmCallback => Boolean(callback),
  target: executeConfirmFx,
})

/* Закрываем диалог при подтверждении */
sample({
  clock: confirmClicked,
  target: closeConfirmDialog,
})
