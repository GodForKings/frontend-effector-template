'use client'

import { useUnit } from 'effector-react'
import { debounce } from 'lodash'
import { Plus, Search } from 'lucide-react'
import { type ChangeEvent, type FC, useMemo, useState } from 'react'

import { cn, DEBOUNCE, InfoBlock, openDialog } from '@/shared'
import { Button, Input } from '@/shared/ui/shadcn'

import { categoryModels } from '../model/list'
import { CategoryForm } from './CategoryForm'

export const CategoryToolbar: FC = () => {
  const [search, filtersChanged, createClicked, openDialogFn] = useUnit([
    categoryModels.stores.$filters,
    categoryModels.events.filtersChanged,
    categoryModels.events.createClicked,
    openDialog,
  ])

  const [localSearch, setLocalSearch] = useState(search.search)

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

  const createCategoryFn = () => {
    createClicked()
    openDialogFn({ content: <CategoryForm /> })
  }

  return (
    <div className={cn('flex flex-col gap-4', 'sm:flex-row sm:items-center sm:justify-between')}>
      <InfoBlock
        title='Категории'
        paragraph='Управление структурой каталога и иерархией разделов'
      />

      <div className={cn('flex items-center gap-3 sm:shrink-0')}>
        <div className='relative'>
          <Search
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2',
              'size-4 text-muted-foreground pointer-events-none',
            )}
          />

          <Input
            className='pl-9 w-60'
            placeholder='Поиск по названию...'
            value={localSearch}
            onChange={handleSearch}
          />
        </div>

        <Button onClick={createCategoryFn}>
          <Plus className='size-4' />
          Создать
        </Button>
      </div>
    </div>
  )
}
