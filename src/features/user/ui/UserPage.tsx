'use client'

import { useGate } from 'effector-react'
import type { FC } from 'react'

import { cn } from '@/shared'

import { userModels } from '../model/list'
import { UserTable } from './UserTable'
import { UserToolbar } from './UserToolbar'

export const UserPage: FC = () => {
  useGate(userModels.gates.UserPageGate)

  return (
    <div className={cn('space-y-6')}>
      <UserToolbar />

      <UserTable />
    </div>
  )
}
