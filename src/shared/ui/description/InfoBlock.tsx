'use client'

import { motion } from 'motion/react'
import type { FC, ReactNode } from 'react'

import { cn } from '@/shared'

interface InfoBlockProps {
  title: string
  paragraph?: string | null
  value?: ReactNode
  icon?: ReactNode
  headerClass?: string
  paragraphClass?: string
  valueClass?: string
  className?: string
}

export const InfoBlock: FC<InfoBlockProps> = (props) => {
  const { title, paragraph, value, icon, headerClass, paragraphClass, valueClass, className } =
    props

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeIn' }}
      className={cn('relative w-full', 'flex flex-col justify-center gap-1', className)}
    >
      <div
        className={cn(
          'text-2xl md:text-3xl font-semibold tracking-tight text-foreground flex items-center gap-2',
          headerClass,
        )}
      >
        {icon && <span className='text-muted-foreground shrink-0'>{icon}</span>}

        <h2>{title ?? '-'}</h2>
      </div>

      {value && (
        <div className={cn('break-all text-sm font-medium text-foreground mt-1', valueClass)}>
          {value}
        </div>
      )}

      {!value && paragraph && (
        <p
          className={cn(
            'wrap-break-word text-sm text-muted-foreground text-balance max-w-2xl leading-relaxed mt-0.5',
            paragraphClass,
          )}
        >
          {paragraph || '-'}
        </p>
      )}
    </motion.div>
  )
}
