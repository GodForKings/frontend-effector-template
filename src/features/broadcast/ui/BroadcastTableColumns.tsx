'use client'

import { createColumnHelper } from '@tanstack/react-table'
import { Eye } from 'lucide-react'

import type { BroadcastResponseDto } from '@/entities/mail'
import { closeDialog, formatDate, openDialog } from '@/shared'
import { Badge, Button } from '@/shared/ui/shadcn'

import { BroadcastPreview } from './BroadcastPreview'

const columnHelper = createColumnHelper<BroadcastResponseDto>()

export const getBroadcastColumns = () => [
  columnHelper.accessor('subject', {
    header: 'Тема письма',
    cell: (info) => (
      <span className='font-medium text-foreground max-w-xs truncate block'>{info.getValue()}</span>
    ),
  }),

  columnHelper.accessor('sentCount', {
    header: 'Получателей',
    cell: (info) => (
      <Badge variant='outline' className='font-medium'>
        {info.getValue()}
      </Badge>
    ),
  }),

  columnHelper.accessor('createdAt', {
    header: 'Дата отправки',
    cell: (info) => (
      <span className='text-muted-foreground text-xs font-mono'>
        {formatDate(info.getValue(), { dateStyle: 'medium', timeStyle: 'short' })}
      </span>
    ),
  }),

  columnHelper.display({
    id: 'actions',
    header: () => <span className='sr-only'>Действия</span>,
    cell: (info) => {
      const row = info.row.original
      return (
        <div className='text-right'>
          <Button
            variant='outline'
            onClick={() => {
              openDialog({
                content: (
                  <BroadcastPreview
                    subject={row.subject}
                    content={row.body}
                    onBackToEdit={closeDialog}
                  />
                ),
              })
            }}
          >
            <Eye className='size-4 mr-1.5' />
            Посмотреть
          </Button>
        </div>
      )
    },
  }),
]
