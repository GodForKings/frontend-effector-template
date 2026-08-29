import type { ReactNode } from 'react'

export type ApiErrorBody = {
  message?: string
}

export interface PageParamsProps<TParams> {
  params: Promise<TParams>
}

export interface WindowState {
  isOpen: boolean
  content: ReactNode | null
  className?: string | null
}
