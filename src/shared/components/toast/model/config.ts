import { Angry, CheckCircle2, Info, Loader2, type LucideIcon } from 'lucide-react'
import type { ToastType } from 'react-hot-toast'

export const TOAST_CONFIG: Record<
  ToastType,
  {
    icon: LucideIcon
    iconClass: string
    iconBg: string
    border: string
    shadow: string
  }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: 'size-5 text-emerald-500',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    border: 'border-emerald-500/20 dark:border-emerald-500/30',
    shadow: 'shadow-emerald-500/5',
  },
  error: {
    icon: Angry,
    iconClass: 'size-5 text-destructive',
    iconBg: 'bg-destructive/10 dark:bg-destructive/20',
    border: 'border-destructive/20 dark:border-destructive/30',
    shadow: 'shadow-destructive/5',
  },
  loading: {
    icon: Loader2,
    iconClass: 'size-5 animate-spin text-muted-foreground',
    iconBg: 'bg-muted',
    border: 'border-border',
    shadow: 'shadow-black/5',
  },
  blank: {
    icon: Info,
    iconClass: 'size-5 text-info',
    iconBg: 'bg-info/10 dark:bg-info/20',
    border: 'border-info/20 dark:border-info/30',
    shadow: 'shadow-info/5',
  },
  custom: {
    icon: Info,
    iconClass: 'size-5 text-info',
    iconBg: 'bg-info/10 dark:bg-info/20',
    border: 'border-info/20 dark:border-info/30',
    shadow: 'shadow-info/5',
  },
}
