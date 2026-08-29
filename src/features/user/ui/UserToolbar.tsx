'use client'

import { useUnit } from 'effector-react'
import { debounce } from 'lodash'
import { Download, Search } from 'lucide-react'
import { type ChangeEvent, type FC, useMemo, useState } from 'react'

import { cn, DEBOUNCE, InfoBlock } from '@/shared'
import { Button, Input } from '@/shared/ui/shadcn'

import { userModels } from '../model/list'

export const UserToolbar: FC = () => {
  const [filters, filtersChanged, downloadClick] = useUnit([
    userModels.stores.$filters,
    userModels.events.filtersChanged,
    userModels.events.downloadUsers,
  ])

  const [localSearch, setLocalSearch] = useState(filters.search)

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        filtersChanged({ search: value })
      }, DEBOUNCE),
    [filtersChanged],
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalSearch(value)
    debouncedSearch(value)
  }

  return (
    <div className={cn('flex flex-col gap-4', 'sm:flex-row sm:items-center sm:justify-between')}>
      <InfoBlock
        title='Пользователи'
        paragraph='Редактирование и просмотр учетных данных пользователей'
      />

      <div className={cn('flex flex-col gap-3', 'xs:flex-row xs:items-center sm:shrink-0')}>
        {/* Поиск */}
        <div className={cn('relative')}>
          <Search
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2',
              'size-4 text-muted-foreground pointer-events-none',
            )}
          />

          <Input
            className={cn('pl-9 w-full xs:w-52')}
            placeholder='По имени, email или тел...'
            value={localSearch}
            onChange={handleSearch}
          />
        </div>

        <Button
          variant='default'
          className={cn('gap-2', 'w-full xs:w-auto')}
          onClick={downloadClick}
        >
          <Download className={cn('size-4')} />
          Скачать (CSV)
        </Button>
      </div>
    </div>
  )
}
