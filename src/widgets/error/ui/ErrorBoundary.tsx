'use client'

import { Component, type ComponentType, type ErrorInfo, type PropsWithChildren } from 'react'

export interface ErrorBoundaryProps extends PropsWithChildren {
  fallback: ComponentType<{ error: Error }>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {}

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo)
  }

  render() {
    const { error } = this.state
    const { fallback: Fallback, children } = this.props

    return error ? <Fallback error={error} /> : children
  }
}
