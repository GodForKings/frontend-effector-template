import { AlertCircle, AlertTriangle, HelpCircle } from 'lucide-react'
import type { HTMLMotionProps } from 'motion/react'

import type { ConfirmVariant } from './types'

export const VARIANT_CONFIG: Record<
  ConfirmVariant,
  {
    icon: typeof AlertTriangle
    badgeClass: string
    buttonVariant: 'destructive' | 'default'
  }
> = {
  destructive: {
    icon: AlertTriangle,
    badgeClass: 'bg-destructive/10 text-destructive border-destructive/20',
    buttonVariant: 'destructive',
  },
  warning: {
    icon: AlertCircle,
    badgeClass: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    buttonVariant: 'default',
  },
  default: {
    icon: HelpCircle,
    badgeClass: 'bg-primary/10 text-primary border-primary/20',
    buttonVariant: 'default',
  },
}

export const BACKDROP_ANIMATION: HTMLMotionProps<'div'> = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.18, ease: 'linear' },
}

export const DIALOG_ANIMATION: HTMLMotionProps<'div'> = {
  initial: { opacity: 0, scale: 0.95, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 12 },
  transition: { duration: 0.2, ease: 'anticipate' },
}
