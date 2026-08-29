import { Cog, LayersPlus, ShieldCheck, UserCog } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'

import { cn, PAGES } from '@/shared'
import { Badge, Button } from '@/shared/ui/shadcn'

export const DashboardHero: FC = () => {
  return (
    <div
      className={cn(
        'relative overflow-hidden p-6 md:p-8',
        'border border-border rounded-xl shadow',
        'bg-linear-to-r from-primary/10 via-background to-accent/10',
      )}
    >
      <div className='absolute -right-12 -top-12 size-56 pointer-events-none rounded-full bg-primary/10 blur-3xl' />

      <div
        className={cn(
          'flex flex-col justify-between gap-8 md:flex-row md:items-center',
          'relative z-10',
        )}
      >
        <div className='space-y-3 max-w-2xl'>
          <h1 className='text-2xl font-bold tracking-tight text-foreground'>Панель управления</h1>
          <p className='text-sm text-muted-foreground'>
            Управление пользователями, каталогом и системными настройками приложения
          </p>

          <Badge variant='active' className='mt-1'>
            <ShieldCheck className='size-3.5 mr-1' />
            Система работает штатно
          </Badge>
        </div>

        <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
          <Button asChild>
            <Link href={PAGES.USERS}>
              <UserCog className='size-4' />
              Пользователи
            </Link>
          </Button>

          <Button asChild variant='outline'>
            <Link href={PAGES.CATEGORIES}>
              <LayersPlus className='size-4' />
              Категории
            </Link>
          </Button>

          <Button asChild variant='secondary'>
            <Link href={PAGES.SETTINGS}>
              <Cog className='size-4' />
              Настройки
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
