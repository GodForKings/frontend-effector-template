import { PAGES } from '@/shared'

import type { NavigationGroup } from '../model/types'

export const isActiveLink = (pathname: string, href: string): boolean => {
  if (href === PAGES.MAIN) {
    return pathname === PAGES.MAIN
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export const isGroupActive = (pathname: string, group: NavigationGroup): boolean => {
  return group.items.some((item) => isActiveLink(pathname, item.href))
}
