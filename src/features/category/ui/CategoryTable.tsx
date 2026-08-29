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
import { useState } from 'react'

import { cn, Empty, PAGINATION_SIZE, SortIcon } from '@/shared'
import { TableSkeleton } from '@/shared/ui'
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

import { categoryModels } from '../model/list'
import { categoryColumns } from './CategoryTableColumns'

export const CategoryTable: FC = () => {
  const [data, isLoading] = useUnit([
    categoryModels.stores.$filteredCategories,
    categoryModels.stores.$isLoading,
  ])

  const [sorting, setSorting] = useState<SortingState>([])

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: categoryColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: PAGINATION_SIZE,
      },
    },
  })

  if (!isLoading && data.length === 0) {
    return (
      <Empty
        title='Категорий нет'
        description='Создайте первую категорию, нажав кнопку «Создать»'
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
          {isLoading ? (
            <TableSkeleton
              columnsCount={categoryColumns.length}
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
                    <TableCell key={cell.id} className='px-4 py-3 text-sm'>
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
        <div>Всего категорий: {data.length}</div>

        <Pagination className='mx-0 w-auto justify-end'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  if (table.getCanPreviousPage()) {
                    table.previousPage()
                  }
                }}
                className={cn(
                  'cursor-pointer select-none',
                  !table.getCanPreviousPage() && 'pointer-events-none opacity-50',
                )}
                text='Назад'
              />
            </PaginationItem>

            {Array.from({ length: table.getPageCount() }).map((_, pageIndex) => (
              <PaginationItem key={pageIndex}>
                <PaginationLink
                  href='#'
                  onClick={(e) => {
                    e.preventDefault()
                    table.setPageIndex(pageIndex)
                  }}
                  isActive={table.getState().pagination.pageIndex === pageIndex}
                  className='cursor-pointer select-none'
                >
                  {pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  if (table.getCanNextPage()) {
                    table.nextPage()
                  }
                }}
                className={cn(
                  'cursor-pointer select-none',
                  !table.getCanNextPage() && 'pointer-events-none opacity-50',
                )}
                text='Вперед'
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
