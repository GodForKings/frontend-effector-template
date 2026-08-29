import type { PropsWithChildren } from 'react'

import { cn } from '@/shared'
import { AppNavigation } from '@/widgets/navigation'

import { AuthGuard } from '../_providers'

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <div className='min-h-dvh bg-background'>
        <AppNavigation />

        <main className={cn('container mx-auto p-2', 'relative overflow-y-auto')}>{children}</main>
      </div>
    </AuthGuard>
  )
}
