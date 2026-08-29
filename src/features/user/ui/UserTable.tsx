'use client'

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useUnit } from 'effector-react'
import type { FC } from 'react'
import { useMemo, useState } from 'react'

import { cn } from '@/shared'
import { Empty, SortIcon, TableSkeleton } from '@/shared/ui'
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

import { userModels } from '../model/list'
import { getUserColumns } from './UserTableColumns'

export const UserTable: FC = () => {
  const [data, isLoading, page, totalPages, total, pageChanged] = useUnit([
    userModels.stores.$users,
    userModels.stores.$isListLoading,
    userModels.stores.$filters.map((f) => f.page),
    userModels.stores.$totalPages,
    userModels.stores.$total,
    userModels.events.pageChanged,
  ])

  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo(() => getUserColumns(), [])

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  if (!isLoading && data.length === 0) {
    return (
      <Empty
        title='Пользователи не найдены'
        description='Нет зарегистрированных пользователей по вашему запросу'
        className={cn('py-20')}
      />
    )
  }

  return (
    <div className={cn('bg-card overflow-hidden shadow', 'rounded-xl border border-border')}>
      <Table>
        <TableHeader className={cn('bg-muted')}>
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
                    <div className={cn('flex items-center gap-1.5')}>
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
          {isLoading ? (
            <TableSkeleton
              columnsCount={columns.length}
              rowsCount={5}
              showAvatar={true}
              showActions={true}
            />
          ) : (
            table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    'hover:bg-muted/20',
                    'transition-colors duration-150',
                    'border-b border-border/60 last:border-0',
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cn('px-4 py-3 text-sm')}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
          )}
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
        <div>Всего пользователей: {total}</div>

        {totalPages > 1 ? (
          <Pagination className={cn('mx-0 w-auto justify-end')}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  text='Назад'
                  href='#'
                  onClick={(e) => {
                    e.preventDefault()
                    if (page > 1) pageChanged(page - 1)
                  }}
                  className={cn('cursor-pointer', page <= 1 && 'pointer-events-none opacity-50')}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      pageChanged(index + 1)
                    }}
                    isActive={page === index + 1}
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
                    if (page < totalPages) pageChanged(page + 1)
                  }}
                  className={cn(
                    'cursor-pointer',
                    page >= totalPages && 'pointer-events-none opacity-50',
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
