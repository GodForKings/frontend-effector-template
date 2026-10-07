'use client'

import { useUnit } from 'effector-react'
import { Moon, Sun } from 'lucide-react'
import { type FC, use } from 'react'
import { browser } from 'react-dom'

import { Button } from '@/shared/ui/shadcn'

import { themeModel } from '../model/theme'

export const ThemeSwitcher: FC = () => {
  use(browser())
  const [theme, themeToggled] = useUnit([themeModel.stores.$theme, themeModel.events.themeToggled])

  const isDark = theme === 'dark'

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
