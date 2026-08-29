'use client'

import { Binary } from 'lucide-react'
import type { FC } from 'react'

import { cn, InfoBlock } from '@/shared'

interface EmptyProps {
  className?: string
  iconSize?: number
  description?: string
  title?: string
}

export const Empty: FC<EmptyProps> = (props) => {
  const { className, iconSize = 100, description, title = 'Ничего нет' } = props

  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center gap-5',
        'w-full text-center',
        className,
      )}
    >
      <Binary size={iconSize} className='animate-pulse' />

      <InfoBlock
        className='gap-3 items-center'
        headerClass='text-lg font-bold'
        title={title}
        paragraph={description}
        paragraphClass='text-sm font-medium'
      />
    </div>
  )
}
