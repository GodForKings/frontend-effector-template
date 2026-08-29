'use client'

import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'motion/react'
import { type FC, useEffect } from 'react'

import { cn } from '@/shared/utils'

import { $isModalOpen, $modalClassName, $modalContent, closeModal } from '../model'

export const Modal: FC = () => {
  const [isOpen, onClose, content, className] = useUnit([
    $isModalOpen,
    closeModal,
    $modalContent,
    $modalClassName,
  ])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed inset-0 z-100 p-0 md:p-4',
            'flex justify-center items-end md:items-center',
            'bg-black/60 backdrop-blur-xs',
          )}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            drag='y'
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.95 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) {
                onClose()
              }
            }}
            className={cn(
              'relative bg-card rounded-t-3xl border border-border/10',
              'w-full max-h-[90vh] overflow-y-auto touch-none select-none',
              'md:rounded-3xl md:max-w-4xl md:w-full md:max-h-[90vh] md:select-text',
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={cn('flex justify-center', 'pt-3.5 pointer-events-none md:hidden')}>
              <div className='w-9 h-1 bg-muted rounded-sm' />
            </div>

            <div className='pointer-events-auto touch-auto'>{content}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
