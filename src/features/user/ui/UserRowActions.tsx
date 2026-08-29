'use client'

import { useUnit } from 'effector-react'
import { Pencil, Settings } from 'lucide-react'
import type { FC } from 'react'

import { cn, openModal, UserAdminResponseDto } from '@/shared'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn'

import { userModels } from '../model/list'
import { UserFormModal } from './UserFormModal'

interface UserRowActionsProps {
  row: UserAdminResponseDto
}

export const UserRowActions: FC<UserRowActionsProps> = ({ row }) => {
  const [editClicked, openModalFn] = useUnit([userModels.events.editClicked, openModal])

  const handleEdit = () => {
    editClicked(row)
    openModalFn({ content: <UserFormModal /> })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className={cn('size-8')}
          aria-label='Действия со строкой'
        >
          <Settings className={cn('size-4')} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className={cn('w-40')}>
        <DropdownMenuItem onClick={handleEdit} className={cn('gap-2')}>
          <Pencil className={cn('size-4 text-muted-foreground')} />
          Редактировать
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
