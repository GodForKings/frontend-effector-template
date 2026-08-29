'use client'

import { useUnit } from 'effector-react'
import { ScanFace, Signpost } from 'lucide-react'
import { redirect, usePathname } from 'next/navigation'
import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'

import { userAuthModels } from '@/entities'
import { cn, PUBLIC_PAGES } from '@/shared'

import { ProtectedGatesApp } from './ProtectedGatesApp'

const PUBLIC_ROUTES = ['/login', '/reg']

export const AuthGuard: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const pathname = usePathname()

  const [isAuthenticated, loading, authCheckStarted] = useUnit([
    userAuthModels.stores.$isAuthenticated,
    userAuthModels.stores.$authLoading,
    userAuthModels.events.authCheckStarted,
  ])

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  useEffect(() => {
    if (isPublicRoute) return
    if (isAuthenticated !== null) return

    authCheckStarted()
  }, [authCheckStarted, isPublicRoute, isAuthenticated])

  useEffect(() => {
    if (loading) return

    if (!isPublicRoute && isAuthenticated === false) {
      redirect(PUBLIC_PAGES.LOGIN)
    }
  }, [isAuthenticated, isPublicRoute, loading])

  if (isPublicRoute) {
    return <>{children}</>
  }

  if (loading || isAuthenticated === null) {
    return (
      <div
        className={cn(
          'min-h-dvh bg-background p-4',
          'text-sm text-muted-foreground',
          'flex items-center justify-center gap-4 flex-col',
        )}
      >
        <ScanFace className='animate-pulse size-15 text-primary shrink-0' />
        Проверка авторизации...
      </div>
    )
  }

  if (isAuthenticated === false) {
    return (
      <div
        className={cn(
          'min-h-dvh bg-background p-4',
          'text-sm text-muted-foreground',
          'flex items-center justify-center gap-4 flex-col',
        )}
      >
        <Signpost className='animate-pulse size-15 text-primary shrink-0' />
        Перенаправление на страницу входа...
      </div>
    )
  }

  return (
    <>
      <ProtectedGatesApp />

      {children}
    </>
  )
}
