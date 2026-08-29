import { createEvent, createStore } from 'effector'

import type { WindowState } from '@/shared/types'

export const openModal = createEvent<Omit<WindowState, 'isOpen'>>()
export const closeModal = createEvent()

const CLEAR_CONTENT: WindowState = {
  isOpen: false,
  content: null,
  className: null,
}

export const $modalState = createStore<WindowState>(CLEAR_CONTENT)
  .on(openModal, (_, { content, className }) => ({
    isOpen: true,
    content,
    className: className ?? '',
  }))
  .on(closeModal, () => CLEAR_CONTENT)

export const $isModalOpen = $modalState.map((state) => state.isOpen)
export const $modalContent = $modalState.map((state) => state.content)
export const $modalClassName = $modalState.map((state) => state.className)
