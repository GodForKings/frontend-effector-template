'use client'

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useUnit } from 'effector-react'
import type { FC } from 'react'
import { useMemo, useState } from 'react'

import { mailModels } from '@/entities'
import { cn } from '@/shared'
import { Empty, SortIcon } from '@/shared/ui'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/shadcn'

import { getBroadcastColumns } from './BroadcastTableColumns'

export const BroadcastHistoryTable: FC = () => {
  const [data, isLoading] = useUnit([
    mailModels.stores.$broadcasts,
    mailModels.stores.$isBroadcastsLoading,
  ])

  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo(() => getBroadcastColumns(), [])

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const { pageIndex } = table.getState().pagination
  const pageCount = table.getPageCount()

  if (!isLoading && data.length === 0) {
    return (
      <Empty
        title='История рассылок пуста'
        description='Нет ранее отправленных email-рассылок'
        className='py-20'
      />
    )
  }

  return (
    <div className={cn('bg-card overflow-hidden shadow', 'rounded-xl border border-border')}>
      <Table>
        <TableHeader className='bg-muted'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className={cn('hover:bg-transparent', 'border-b border-border/80')}
            >
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const sortDirection = header.column.getIsSorted()

                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'h-11 px-4 text-left text-xs font-medium text-muted-foreground transition-colors',
                      canSort && 'cursor-pointer hover:text-foreground select-none',
                    )}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <div className='flex items-center gap-1.5'>
                      {flexRender(header.column.columnDef.header, header.getContext())}

                      {canSort && <SortIcon direction={sortDirection} />}
                    </div>
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j} className='px-4 py-3.5'>
                      <div className='h-4 rounded bg-muted/60 animate-pulse' />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    'hover:bg-muted/20',
                    'transition-colors duration-150',
                    'border-b border-border/60 last:border-0',
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='px-4 py-3 text-sm'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>

      <div
        className={cn(
          'bg-muted px-4 py-3',
          'text-xs text-muted-foreground font-medium',
          'flex flex-col gap-4',
          'sm:flex-row sm:items-center sm:justify-between',
          'border-t border-border',
        )}
      >
        <p>Всего рассылок: {data.length}</p>

        {pageCount >= 1 ? (
          <Pagination className='mx-0 w-auto justify-end'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  text='Назад'
                  href='#'
                  onClick={(e) => {
                    e.preventDefault()
                    if (table.getCanPreviousPage()) {
                      table.previousPage()
                    }
                  }}
                  className={cn(
                    'cursor-pointer',
                    !table.getCanPreviousPage() && 'pointer-events-none opacity-50',
                  )}
                />
              </PaginationItem>

              {Array.from({ length: pageCount }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      table.setPageIndex(index)
                    }}
                    isActive={pageIndex === index}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  text='Вперед'
                  href='#'
                  onClick={(e) => {
                    e.preventDefault()
                    if (table.getCanNextPage()) {
                      table.nextPage()
                    }
                  }}
                  className={cn(
                    'cursor-pointer',
                    !table.getCanNextPage() && 'pointer-events-none opacity-50',
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}
      </div>
    </div>
  )
}
