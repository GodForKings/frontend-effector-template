import {
  Cog,
  LayersPlus,
  LayoutDashboard,
  Mails,
  UserCog,
} from 'lucide-react'

import { PAGES } from '@/shared'

import type { NavigationItem, SingleNavItem } from './types'

export const singleNavItems: SingleNavItem[] = [
  { href: PAGES.MAIN, label: 'Главная', icon: LayoutDashboard },
  { href: PAGES.USERS, label: 'Пользователи', icon: UserCog },
  { href: PAGES.CATEGORIES, label: 'Категории', icon: LayersPlus },
  { href: PAGES.BROADCASTS, label: 'Рассылки', icon: Mails },
  { href: PAGES.SETTINGS, label: 'Настройки', icon: Cog },
]

export const navigationItems: NavigationItem[] = [
  {
    href: PAGES.MAIN,
    label: 'Главная',
    icon: LayoutDashboard,
  },
  {
    href: PAGES.USERS,
    label: 'Пользователи',
    icon: UserCog,
  },
  {
    href: PAGES.CATEGORIES,
    label: 'Категории',
    icon: LayersPlus,
  },
  {
    href: PAGES.BROADCASTS,
    label: 'Рассылки',
    icon: Mails,
  },
  {
    href: PAGES.SETTINGS,
    label: 'Настройки',
    icon: Cog,
  },
]
