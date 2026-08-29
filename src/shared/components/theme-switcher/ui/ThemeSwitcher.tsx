'use client'

import { useUnit } from 'effector-react'
import { Moon, Sun } from 'lucide-react'
import type { FC } from 'react'

import { useMounted } from '@/shared/hooks'
import { Button } from '@/shared/ui/shadcn'

import { themeModel } from '../model/theme'

export const ThemeSwitcher: FC = () => {
  const [theme, themeToggled] = useUnit([themeModel.stores.$theme, themeModel.events.themeToggled])
  const mounted = useMounted()

  const isDark = mounted && theme === 'dark'

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={themeToggled}
      title={isDark ? 'Включить светлую тему' : 'Включить темную тему'}
    >
      {isDark ? <Sun className='size-5 text-yellow-500' /> : <Moon className='size-5' />}
    </Button>
  )
}
