'use client'

import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

export type Theme = 'dark' | null

/* Гейты */
export const ThemeGate = createGate()

/* События */
export const themeToggled = createEvent()

/* Эффект для сохранения темы в localStorage */
const saveThemeFx = createEffect((theme: Theme) => {
  if (theme) {
    localStorage.setItem('theme', theme)
  } else {
    localStorage.setItem('theme', 'light')
  }
})

/* Эффект для загрузки темы при инициализации */
const loadThemeFx = createEffect((): Theme => {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark') {
    return 'dark'
  }
  if (stored === 'light') {
    return null
  }
  // Если в localStorage ничего нет, проверяем системную тему
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return null
})

/* Стор темы */
export const $theme = createStore<Theme>(null)
  .on(loadThemeFx.doneData, (_, theme) => theme)
  .on(themeToggled, (current) => (current === 'dark' ? null : 'dark'))

/* При монтировании гейта загружаем тему */
sample({
  clock: ThemeGate.open,
  target: loadThemeFx,
})

/* При изменении темы сохраняем ее */
sample({
  clock: $theme,
  target: saveThemeFx,
})

export const themeModel = {
  stores: {
    $theme,
  },
  events: {
    themeToggled,
  },
  gates: {
    ThemeGate,
  },
}
