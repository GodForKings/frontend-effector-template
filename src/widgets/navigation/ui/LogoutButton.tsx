'use client'

import { useUnit } from 'effector-react'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

import { userAuthModels } from '@/entities'
import { PUBLIC_PAGES } from '@/shared'
import { Button } from '@/shared/ui/shadcn'

interface LogoutButtonProps {
  className?: string
  variant?: 'outline' | 'ghost' | 'secondary' | 'link' | 'default' | 'destructive'
}

export const LogoutButton: FC<LogoutButtonProps> = (props) => {
  const { className, variant = 'outline' } = props

  const router = useRouter()
  const [logoutClicked] = useUnit([userAuthModels.events.logoutClicked])

  const handleLogout = () => {
    logoutClicked()
    router.replace(PUBLIC_PAGES.LOGIN)
  }

  return (
    <Button variant={variant} className={className} onClick={handleLogout}>
      <LogOut className='size-4' />
      Выйти
    </Button>
  )
}
