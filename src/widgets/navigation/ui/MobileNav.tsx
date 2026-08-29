'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC, useState } from 'react'

import { ThemeSwitcher } from '@/shared'
import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/shadcn'

import { isActiveLink } from '../lib/helpers'
import { navigationItems } from '../model/pages.config'
import { LogoutButton } from './LogoutButton'

export const MobileNav: FC = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='xl:hidden flex items-center gap-2'>
      <ThemeSwitcher />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' aria-label='Открыть навигацию'>
            <Menu className='size-5' />
          </Button>
        </SheetTrigger>

        <SheetContent side='left' className='w-70'>
          <SheetHeader>
            <SheetTitle className='text-xl'>Навигация</SheetTitle>
          </SheetHeader>

          <div className='px-4 space-y-2'>
            <p className='text-sm font-medium text-muted-foreground'>Разделы</p>

            <div className='flex flex-col gap-1'>
              {navigationItems.map((item) => {
                const Icon = item.icon
                const active = isActiveLink(pathname, item.href)

                return (
                  <Button
                    key={item.href}
                    asChild
                    variant={active ? 'secondary' : 'ghost'}
                    className='justify-start'
                  >
                    <Link href={item.href} onClick={() => setOpen(false)}>
                      <Icon className='size-4' />

                      {item.label}
                    </Link>
                  </Button>
                )
              })}
            </div>

            <Separator className='my-4' />

            <LogoutButton variant='outline' className='justify-start gap-2 w-full' />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
