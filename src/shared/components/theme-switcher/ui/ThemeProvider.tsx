'use client'

import { useGate, useUnit } from 'effector-react'
import { type FC, type PropsWithChildren, useEffect } from 'react'

import { themeModel } from '../model/theme'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  useGate(themeModel.gates.ThemeGate)

  const theme = useUnit(themeModel.stores.$theme)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return <>{children}</>
}
