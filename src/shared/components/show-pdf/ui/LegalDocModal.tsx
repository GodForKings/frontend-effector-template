'use client'

import { useUnit } from 'effector-react'
import { X } from 'lucide-react'
import type { FC } from 'react'

import { closeModal } from '@/shared/components/modal'
import { PDFViewer } from '@/shared/ui'
import { Button } from '@/shared/ui/shadcn'
import { cn } from '@/shared/utils'

interface LegalDocModalProps {
  title: string
  currentSrc: string
}

export const LegalDocModal: FC<LegalDocModalProps> = (props) => {
  const { title, currentSrc } = props
  const onClose = useUnit(closeModal)

  return (
    <div className={cn('flex justify-center flex-col gap-4', 'px-4 pt-2')}>
      <div className={cn('flex items-center justify-between gap-2')}>
        <h2 className={cn('text-lg font-medium tracking-wide')}>{title}</h2>

        <Button
          size='sm'
          onClick={onClose}
          variant='secondary'
          className='size-9 rounded-2xl shrink-0'
        >
          <X size={22} />
        </Button>
      </div>

      <PDFViewer currentSrc={currentSrc} />
    </div>
  )
}
