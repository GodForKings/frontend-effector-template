'use client'

import { useUnit } from 'effector-react'
import { Pencil, Settings, Trash2 } from 'lucide-react'
import type { FC } from 'react'

import { openDialog } from '@/shared'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn'

import { categoryModels } from '../model/list'
import type { CategoryRow } from '../model/types'
import { CategoryForm } from './CategoryForm'

interface CategoryRowActionsProps {
  row: CategoryRow
}

export const CategoryRowActions: FC<CategoryRowActionsProps> = ({ row }) => {
  const [editClicked, deleteClicked, openDialogFn] = useUnit([
    categoryModels.events.editClicked,
    categoryModels.events.deleteClicked,
    openDialog,
  ])

  const handleEdit = () => {
    editClicked(row)
    openDialogFn({ content: <CategoryForm /> })
  }

  const handleDelete = () => {
    deleteClicked(row)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='size-8' aria-label='Действия со строкой'>
          <Settings className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuItem onClick={handleEdit} className='gap-2'>
          <Pencil className='size-4 text-muted-foreground' />
          Редактировать
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleDelete}
          className='text-destructive focus:text-destructive focus:bg-destructive/10 gap-2'
        >
          <Trash2 className='size-4' />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
