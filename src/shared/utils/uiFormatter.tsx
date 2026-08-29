import { Ellipsis } from 'lucide-react'
import type { ReactNode } from 'react'

/** Для UI пустышки и удалении пробелов
 * @param value string || number || null
 * @returns либо data, либо иконка */
export const getDisplayValue = (value?: string | number | null): string | ReactNode => {
  return value && value.toString().trim() ? value : <Ellipsis className='opacity-70' />
}
