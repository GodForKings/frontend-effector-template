import type { LucideIcon } from 'lucide-react'

interface NavItem {
  label: string
  icon: LucideIcon
}
export interface NavigationItem extends NavItem {
  href: string
}
export interface SingleNavItem extends NavigationItem {
  iconClassName?: string
}
export type NavigationGroup = Partial<NavItem> & { items: NavigationItem[] }
