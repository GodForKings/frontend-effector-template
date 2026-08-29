'use client'

import { useEffect } from 'react'

import { ErrorPage } from '@/widgets'

interface ErrorProps {
  error?: Error & { digest?: string }
  onRetry?: () => void
}

export default function Error({ error, onRetry }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <ErrorPage error={error} onRetry={onRetry} />
}
