'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'

import { cn } from '@/shared'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/shared/ui/shadcn'

import { isActiveLink, isGroupActive } from '../lib/helpers'
import type { NavigationGroup } from '../model/types'

interface NavDropdownProps {
  group: NavigationGroup
  pathname: string
}

export const NavDropdown: FC<NavDropdownProps> = (props) => {
  const { group, pathname } = props
  const isGroupActiveState = isGroupActive(pathname, group)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          navigationMenuTriggerStyle(),
          'gap-1.5 cursor-pointer',
          isGroupActiveState && 'bg-accent text-accent-foreground',
        )}
      >
        {group.icon && <group.icon className='size-4' />}

        {group.label}
        <ChevronDown className='size-3.5 opacity-60' />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='w-48'>
        {group.items.map((item) => {
          const Icon = item.icon
          const active = isActiveLink(pathname, item.href)

          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-2 w-full',
                  active && 'font-medium text-primary',
                )}
              >
                <Icon className='size-4' />

                {item.label}
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
