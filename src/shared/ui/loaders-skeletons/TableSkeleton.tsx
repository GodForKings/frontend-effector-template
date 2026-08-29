import type { FC } from 'react'

import { cn } from '@/shared'
import { Skeleton, TableCell, TableRow } from '@/shared/ui/shadcn'

interface TableSkeletonProps {
  /** Количество колонок */
  columnsCount?: number
  /** Количество строк (по умолчанию 5) */
  rowsCount?: number
  /** Отображать первую колонку как аватар + текст */
  showAvatar?: boolean
  /** Отображать последнюю колонку как кнопку действий */
  showActions?: boolean
  className?: string
}

export const TableSkeleton: FC<TableSkeletonProps> = ({
  columnsCount = 4,
  rowsCount = 5,
  showAvatar = true,
  showActions = true,
  className,
}) => {
  const dynamicColsCount = Math.max(
    1,
    columnsCount - (showAvatar ? 1 : 0) - (showActions ? 1 : 0),
  )

  const getRandomWidth = (rowIndex: number, colIndex: number) => {
    const widths = ['w-20', 'w-28', 'w-36', 'w-24', 'w-32', 'w-16']
    return widths[(rowIndex + colIndex) % widths.length]
  }

  return (
    <>
      {Array.from({ length: rowsCount }).map((_, rowIndex) => (
        <TableRow
          key={rowIndex}
          className={cn(
            'border-b border-border/60 last:border-0 hover:bg-transparent',
            className,
          )}
        >
          {/* Первая колонка: Аватар + текст */}
          {showAvatar ? (
            <TableCell className='px-4 py-3.5'>
              <div className='flex items-center gap-3'>
                <Skeleton className='size-10 shrink-0 rounded-lg' />
                <div className='flex flex-col gap-1.5'>
                  <Skeleton className={cn('h-4', rowIndex % 2 === 0 ? 'w-32' : 'w-40')} />
                  <Skeleton className='h-3 w-20 opacity-60' />
                </div>
              </div>
            </TableCell>
          ) : null}

          {/* Средние колонки с вариативной шириной */}
          {Array.from({ length: dynamicColsCount }).map((_, colIndex) => (
            <TableCell key={colIndex} className='px-4 py-3.5'>
              <Skeleton
                className={cn('h-4 rounded-md', getRandomWidth(rowIndex, colIndex))}
              />
            </TableCell>
          ))}

          {/* Последняя колонка: Кнопка действий */}
          {showActions ? (
            <TableCell className='px-4 py-3.5 text-right'>
              <div className='flex items-center justify-end'>
                <Skeleton className='size-8 rounded-md' />
              </div>
            </TableCell>
          ) : null}
        </TableRow>
      ))}
    </>
  )
}
