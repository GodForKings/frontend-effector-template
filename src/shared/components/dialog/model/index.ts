import { createEvent, createStore } from 'effector'

import type { WindowState } from '@/shared/types'

export const openDialog = createEvent<Omit<WindowState, 'isOpen'>>()
export const closeDialog = createEvent()

const CLEAR: WindowState = {
  isOpen: false,
  content: null,
  className: null,
}

export const $dialogState = createStore<WindowState>(CLEAR)
  .on(openDialog, (_, { content, className }) => ({
    isOpen: true,
    content,
    className: className ?? '',
  }))
  .on(closeDialog, () => CLEAR)

export const $isDialogOpen = $dialogState.map((s) => s.isOpen)
export const $dialogContent = $dialogState.map((s) => s.content)
export const $dialogClassName = $dialogState.map((s) => s.className)
