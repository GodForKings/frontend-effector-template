'use client'

import { useGate } from 'effector-react'
import type { FC } from 'react'

import { categoriesModels } from '@/entities'

/** Для получения `SHARED DATA` для всего приложения */
export const ProtectedGatesApp: FC = () => {
  useGate(categoriesModels.gates.CategoryGate)

  return null
}

