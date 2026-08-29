'use client'

import { useUnit } from 'effector-react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { type FC, useEffect } from 'react'

import { Button } from '@/shared/ui/shadcn'
import { cn } from '@/shared/utils'

import { $confirmState, closeConfirmDialog, confirmClicked } from '../model'
import { BACKDROP_ANIMATION, DIALOG_ANIMATION, VARIANT_CONFIG } from '../model/config'
import { ConfirmIcon } from './ConfirmIcon'

export const ConfirmDialog: FC = () => {
  const [state, onClose, onConfirm] = useUnit([$confirmState, closeConfirmDialog, confirmClicked])
  const config = VARIANT_CONFIG[state.variant]

  useEffect(() => {
    if (!state.isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [state.isOpen, onClose])

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          <motion.div
            {...BACKDROP_ANIMATION}
            className={cn('fixed inset-0 z-103 bg-black/40 backdrop-blur-xs')}
            onClick={onClose}
          />

          <motion.div
            {...DIALOG_ANIMATION}
            className={cn(
              'fixed left-1/2 top-1/2 z-104 -translate-x-1/2 -translate-y-1/2',
              'w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl',
              'border bg-card p-6 shadow-2xl text-card-foreground',
            )}
            onClick={(e) => e.stopPropagation()}
            role='alertdialog'
            aria-modal='true'
            aria-labelledby='confirm-dialog-title'
            aria-describedby='confirm-dialog-description'
          >
            <div className='flex items-start justify-between gap-4'>
              <div className='flex items-start gap-4'>
                <ConfirmIcon variant={state.variant} />

                <div className='space-y-1.5'>
                  <h3 id='confirm-dialog-title' className='text-lg font-semibold leading-none'>
                    {state.title}
                  </h3>

                  {state.description && (
                    <p id='confirm-dialog-description' className='text-sm text-muted-foreground'>
                      {state.description}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type='button'
                variant='ghost'
                size='icon-sm'
                onClick={onClose}
                className='shrink-0 -mr-2 -mt-2 text-muted-foreground hover:text-foreground'
                aria-label='Закрыть'
              >
                <X className='size-4' />
              </Button>
            </div>

            <div className='mt-6 flex items-center justify-end gap-3'>
              <Button type='button' variant='outline' onClick={onClose} disabled={state.isLoading}>
                {state.cancelText}
              </Button>

              <Button
                type='button'
                variant={config.buttonVariant}
                onClick={onConfirm}
                isLoading={state.isLoading}
                autoFocus
              >
                {state.confirmText}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
