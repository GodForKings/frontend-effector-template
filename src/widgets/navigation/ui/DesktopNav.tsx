'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'

import { cn, ThemeSwitcher } from '@/shared'
import { navigationMenuTriggerStyle, Separator } from '@/shared/ui/shadcn'

import { isActiveLink } from '../lib/helpers'
import { singleNavItems } from '../model/pages.config'
import { LogoutButton } from './LogoutButton'

export const DesktopNav: FC = () => {
  const pathname = usePathname()

  return (
    <nav className={cn('items-center gap-1.5 flex-1', 'hidden xl:flex')}>
      {singleNavItems.map(({ href, label, icon: Icon, iconClassName }) => {
        const active = isActiveLink(pathname, href)

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              navigationMenuTriggerStyle(),
              'gap-2',
              active && 'bg-accent text-accent-foreground',
            )}
          >
            <Icon className={cn('size-4', iconClassName)} />

            {label}
          </Link>
        )
      })}

      <Separator orientation='vertical' className='ml-auto h-10' />

      <ThemeSwitcher />

      <LogoutButton className='gap-2' />
    </nav>
  )
}
