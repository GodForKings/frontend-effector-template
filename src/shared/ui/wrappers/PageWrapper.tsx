import type { FC, ReactNode } from 'react'

import { cn } from '@/shared'

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

export const PageWrapper: FC<PageWrapperProps> = (props) => {
  const { children, className } = props

  return (
    <div className={cn('relative overflow-y-auto', 'min-w-full min-h-screen', className)}>
      {children}
    </div>
  )
}
