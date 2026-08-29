'use client'

import { X } from 'lucide-react'
import { motion } from 'motion/react'
import type { FC } from 'react'
import { resolveValue, type Toast, toast } from 'react-hot-toast'

import { cn } from '@/shared'
import { Button } from '@/shared/ui/shadcn'

import { TOAST_CONFIG } from '../model/config'

interface ToastCardProps {
  t: Toast
}

export const ToastCard: FC<ToastCardProps> = ({ t }) => {
  const messageText = resolveValue(t.message, t)
  const config = TOAST_CONFIG[t.type]
  const IconComponent = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: t.visible ? 1 : 0,
        scale: t.visible ? 1 : 0.92,
      }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{
        type: 'spring',
        stiffness: 420,
        damping: 28,
        mass: 0.7,
      }}
      className={cn(
        'pointer-events-auto flex items-center gap-3',
        'min-w-xs max-w-lg rounded-lg border p-4',
        'bg-background/80 backdrop-blur-md dark:bg-card/90 text-foreground',
        'shadow-lg transition-colors duration-150',
        config.border,
        config.shadow,
      )}
    >
      <div
        className={cn('flex items-center justify-center rounded-lg p-1.5 shrink-0', config.iconBg)}
      >
        <IconComponent className={config.iconClass} />
      </div>

      <div className='flex-1 text-sm font-medium leading-snug wrap-break-word'>{messageText}</div>

      {t.type !== 'loading' && (
        <Button
          variant='outline'
          size='icon-sm'
          onClick={() => toast.dismiss(t.id)}
          className='shrink-0'
          aria-label='Закрыть уведомление'
        >
          <X className='aspect-square' />
        </Button>
      )}
    </motion.div>
  )
}
