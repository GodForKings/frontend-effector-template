'use client'

import { useGate, useUnit } from 'effector-react'
import { BrickWallShield } from 'lucide-react'
import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'

import { userAuthModels } from '@/entities'
import { cn, PAGES } from '@/shared'

export default function PublicLayout({ children }: PropsWithChildren) {
  useGate(userAuthModels.gates.AuthGate)

  const [isAuthenticated, refreshLoading] = useUnit([
    userAuthModels.stores.$isAuthenticated,
    userAuthModels.stores.$refreshLoading,
  ])

  if (refreshLoading) {
    return (
      <div
        className={cn(
          'min-h-dvh bg-background p-4',
          'text-foreground animate-pulse',
          'flex items-center justify-center gap-4 flex-col',
        )}
      >
        <BrickWallShield className='animate-bounce size-24 text-primary shrink-0' />
        Проверка прав доступа
      </div>
    )
  }

  if (isAuthenticated) {
    redirect(PAGES.MAIN)
  }

  return children
}
