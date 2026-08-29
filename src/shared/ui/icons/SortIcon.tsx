import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { FC } from 'react'

interface SortIconProps {
  direction: 'asc' | 'desc' | false
}

export const SortIcon: FC<SortIconProps> = ({ direction }) => {
  switch (direction) {
    case 'asc':
      return <ArrowUp className='size-3.5' />
    case 'desc':
      return <ArrowDown className='size-3.5' />
    default:
      return <ArrowUpDown className='size-3.5 opacity-40' />
  }
}
