import type { Effect, EventCallable } from 'effector'

export type ConfirmVariant = 'destructive' | 'default' | 'warning'

export type ConfirmCallback = (() => void) | EventCallable<void> | Effect<void, unknown, unknown>

export interface OpenConfirmOptions {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: ConfirmVariant
  onConfirm: ConfirmCallback
}

export interface ConfirmState {
  isOpen: boolean
  title: string
  description?: string
  confirmText: string
  cancelText: string
  variant: ConfirmVariant
  isLoading: boolean
  onConfirm: ConfirmCallback | null
}
