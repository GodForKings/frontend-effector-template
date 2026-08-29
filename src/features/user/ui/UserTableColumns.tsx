'use client'

import { createColumnHelper } from '@tanstack/react-table'
import { Minus } from 'lucide-react'

import { cn, formatDate, formatPhoneDisplay, UserAdminResponseDto } from '@/shared'
import { Badge } from '@/shared/ui/shadcn'

import { UserRowActions } from './UserRowActions'

const columnHelper = createColumnHelper<UserAdminResponseDto>()

export const getUserColumns = () => [
  columnHelper.accessor('email', {
    header: 'Пользователь',
    cell: (info) => {
      const row = info.row.original
      return (
        <div className={cn('flex flex-col gap-0.5 min-w-0')}>
          {row.name ? (
            <span className={cn('font-medium text-sm text-foreground truncate')}>{row.name}</span>
          ) : null}

          <span className={cn('text-xs text-muted-foreground truncate font-mono')}>
            {row.email}
          </span>
        </div>
      )
    },
  }),

  columnHelper.accessor('phone', {
    header: 'Телефон',
    cell: (info) => {
      const val = info.getValue()
      return val ? (
        <span className={cn('text-sm text-foreground')}>{formatPhoneDisplay(val)}</span>
      ) : (
        <Minus className={cn('size-4 opacity-70')} />
      )
    },
  }),

  columnHelper.accessor('role', {
    header: 'Роль',
    cell: (info) => {
      const role = info.getValue()
      return <Badge variant={role === 'ADMIN' ? 'destructive' : 'secondary'}>{role}</Badge>
    },
  }),

  columnHelper.accessor('isBanned', {
    header: 'Статус',
    cell: (info) =>
      info.getValue() ? (
        <Badge variant='destructive' className={cn('inline-flex items-center gap-1.5')}>
          Заблокирован
        </Badge>
      ) : (
        <Badge variant='active' className={cn('inline-flex items-center gap-1.5')}>
          <span className={cn('size-1 animate-pulse rounded-full bg-green-500')} />
          Активен
        </Badge>
      ),
  }),

  columnHelper.accessor('createdAt', {
    header: 'Регистрация',
    cell: (info) => {
      return (
        <span className={cn('text-muted-foreground text-xs')}>
          {formatDate(info.getValue(), { dateStyle: 'short' })}
        </span>
      )
    },
  }),

  columnHelper.display({
    id: 'actions',
    header: () => <span className={cn('sr-only')}>Действия</span>,
    cell: (info) => <UserRowActions row={info.row.original} />,
  }),
]
