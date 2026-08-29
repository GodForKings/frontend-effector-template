import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import { cn, PAGES } from '@/shared'

import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

export const AppNavigation: FC = () => {
  return (
    <header className={cn('border-b backdrop-blur-lg', 'sticky top-0 z-40 px-4')}>
      <div
        className={cn('flex items-center justify-between gap-4', 'container mx-auto h-16 w-full')}
      >
        <Link href={PAGES.MAIN} className='shrink-0'>
          <Image
            title='Главная страница'
            src='/favicon.ico'
            alt='Maison Admin Logo'
            width={32}
            height={32}
            className='size-8 object-contain'
          />
        </Link>

        <DesktopNav />

        <MobileNav />
      </div>
    </header>
  )
}
