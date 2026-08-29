'use client'

import { Bug } from 'lucide-react'
import type { FC } from 'react'

import { cn } from '@/shared'
import { Button } from '@/shared/ui/shadcn'

interface ErrorPageProps {
  error?: Error & { digest?: string }
  onRetry?: () => void
}

export const ErrorPage: FC<ErrorPageProps> = (props) => {
  const { error, onRetry } = props
  return (
    <div
      className={cn('relative z-2 flex min-h-dvh items-center justify-center overflow-hidden py-6')}
    >
      <div className={cn('absolute inset-0 -z-1 flex size-full justify-center')}>
        <Bug className='h-auto w-4/5 text-gray-800' />
      </div>

      <div
        className={cn(
          'flex flex-col items-center justify-center gap-5 rounded-4xl border border-black/50 p-5 backdrop-blur-3xl',
          'max-w-9/10',
        )}
      >
        <h2 className='max-w-9/10 text-center text-xl uppercase'>
          Произошла непредвиденная ошибка
        </h2>

        {process.env.NODE_ENV === 'development' && error?.message && (
          <blockquote className={cn('w-full text-lg/4 text-red-700')}>
            <code>{error.message}</code>
          </blockquote>
        )}

        {onRetry && (
          <Button onClick={onRetry} variant='secondary' size='lg'>
            Попробовать снова
          </Button>
        )}
      </div>
    </div>
  )
}
