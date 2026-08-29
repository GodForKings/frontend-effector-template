import type { FC } from 'react'

import { cn } from '@/shared/utils'

import { VARIANT_CONFIG } from '../model/config'
import type { ConfirmVariant } from '../model/types'

interface ConfirmIconProps {
  variant: ConfirmVariant
}

export const ConfirmIcon: FC<ConfirmIconProps> = (props) => {
  const { variant } = props

  const config = VARIANT_CONFIG[variant]
  const IconComponent = config.icon

  return (
    <div
      className={cn(
        'flex size-12 shrink-0 items-center justify-center rounded-full border',
        config.badgeClass,
      )}
    >
      <IconComponent className='size-6' />
    </div>
  )
}
