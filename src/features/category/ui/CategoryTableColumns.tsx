'use client'

import { createColumnHelper } from '@tanstack/react-table'
import { ImageOff, Minus } from 'lucide-react'

import { cn, getPhotoUrl } from '@/shared'
import { Avatar, AvatarFallback, AvatarImage, Badge } from '@/shared/ui/shadcn'

import type { CategoryRow } from '../model/types'
import { CategoryRowActions } from './CategoryRowActions'

const columnHelper = createColumnHelper<CategoryRow>()

export const categoryColumns = [
  columnHelper.accessor('name', {
    header: 'Название',
    cell: (info) => {
      const row = info.row.original

      return (
        <div className='flex items-center gap-3'>
          <Avatar
            className={cn(
              'size-10 shrink-0 shadow-xs bg-muted/40',
              'rounded-lg after:rounded-lg',
              'border border-border/80',
              'flex items-center justify-center overflow-hidden transition-colors',
            )}
          >
            {row.image && (
              <AvatarImage
                src={getPhotoUrl(row.image)}
                alt={row.name}
                className={cn(
                  'size-full object-cover rounded-lg',
                  'transition-transform duration-300 hover:scale-105',
                )}
              />
            )}

            <AvatarFallback className='rounded-lg'>
              <ImageOff className='size-4 text-muted-foreground/60' />
            </AvatarFallback>
          </Avatar>

          <span className='font-medium text-sm text-foreground'>{row.name}</span>
        </div>
      )
    },
  }),

  columnHelper.accessor('slug', {
    header: 'Слаг',
    cell: (info) => <Badge variant='default'>{info.getValue()}</Badge>,
  }),

  columnHelper.accessor('parentName', {
    header: 'Родитель',
    cell: (info) => {
      return (
        <span className='text-sm text-foreground/80'>
          {info.getValue() ?? <Minus className='opacity-50' />}
        </span>
      )
    },
  }),

  columnHelper.accessor('childrenCount', {
    header: 'Дочерних',
    cell: (info) => {
      return (
        <Badge variant='ghost' className='font-medium text-foreground/50 px-2'>
          {info.getValue() || <Minus className='opacity-50' />}
        </Badge>
      )
    },
  }),

  columnHelper.accessor('sortOrder', {
    header: 'Порядок',
    cell: (info) => (
      <span className='text-sm tabular-nums text-foreground/80'>{info.getValue()}</span>
    ),
  }),

  columnHelper.accessor('isActive', {
    header: 'Статус',
    cell: (info) =>
      info.getValue() ? (
        <Badge variant='active' className='inline-flex items-center gap-1.5'>
          <span className='size-1 rounded-full bg-emerald-500' />
          Активна
        </Badge>
      ) : (
        <Badge
          variant='outline'
          className={cn(
            'text-muted-foreground bg-muted/40',
            'border border-border',
            'inline-flex items-center gap-1.5',
          )}
        >
          <span className='size-1 rounded-full bg-neutral-400 dark:bg-neutral-600' />
          Скрыта
        </Badge>
      ),
  }),

  columnHelper.display({
    id: 'actions',
    header: () => <span className='sr-only'>Действия</span>,
    cell: (info) => <CategoryRowActions row={info.row.original} />,
  }),
]
