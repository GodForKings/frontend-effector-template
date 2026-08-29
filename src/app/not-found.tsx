import { Compass, LayoutDashboard, ShoppingBag } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { cn, PAGES } from '@/shared'
import { Button } from '@/shared/ui/shadcn'

export const metadata: Metadata = {
  title: '404 - Страница не найдена | Maison Admin',
  description: 'Запрошенная страница не существует в панели управления.',
}

const QUICK_LINKS = [
  { label: 'Категории', href: PAGES.CATEGORIES },
  { label: 'Пользователи', href: PAGES.USERS },
  { label: 'Настройки', href: PAGES.SETTINGS },
] as const

export default function NotFound() {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center',
        'min-h-dvh w-full p-4 overflow-hidden select-none',
        'bg-background',
      )}
    >
      {/* Фоновые декоративные эффекты */}
      <div
        className={cn(
          'pointer-events-none absolute -top-40 -left-40',
          'size-96 rounded-full blur-3xl',
          'bg-primary/15',
        )}
      />

      <div
        className={cn(
          'pointer-events-none absolute -bottom-40 -right-40',
          'size-96 rounded-full blur-3xl',
          'bg-info/20',
        )}
      />

      {/* Основная карточка 404 */}
      <div
        className={cn(
          'relative z-10 flex flex-col items-center text-center',
          'w-full max-w-md p-8 sm:p-10 rounded-3xl',
          'border border-border bg-card/85 shadow-xl shadow-black/5 backdrop-blur-xl',
        )}
      >
        {/* Иконка */}
        <div
          className={cn(
            'mb-6 flex size-24 items-center justify-center',
            'rounded-2xl border border-border/80 bg-muted/60 text-foreground',
            'shadow-inner ring-1 ring-border/50',
          )}
        >
          <Compass className='size-12 text-foreground' />
        </div>

        {/* Бейдж ошибки */}
        <div
          className={cn(
            'mb-3 inline-flex items-center gap-2',
            'px-3.5 py-1 rounded-full border border-border/80 bg-muted/50',
            'text-xs font-semibold uppercase tracking-widest text-muted-foreground',
          )}
        >
          <span className='size-2 rounded-full bg-destructive animate-pulse' />
          Ошибка 404
        </div>

        {/* Заголовок и описание */}
        <h1 className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
          Страница не найдена
        </h1>

        <p className='mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base'>
          Запрошенный раздел панели управления не существует или был перемещен по новому адресу.
        </p>

        {/* Основные кнопки действий */}
        <div
          className={cn(
            'mt-8 flex w-full flex-col items-center justify-center gap-3',
            'sm:flex-row',
          )}
        >
          <Button
            asChild
            size='lg'
            className={cn('h-11 w-full gap-2 px-6 rounded-xl font-medium', 'sm:w-auto')}
          >
            <Link replace href={PAGES.MAIN}>
              <LayoutDashboard className='size-4' />
              Главная панель
            </Link>
          </Button>

          <Button
            asChild
            variant='outline'
            size='lg'
            className={cn('h-11 w-full gap-2 px-6 rounded-xl font-medium', 'sm:w-auto')}
          >
            <Link replace href={PAGES.CATEGORIES}>
              <ShoppingBag className='size-4' />
              Категории
            </Link>
          </Button>
        </div>

        {/* Быстрые ссылки */}
        <div
          className={cn(
            'mt-8 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2',
            'border-t border-border/60 pt-6 text-xs text-muted-foreground',
          )}
        >
          <span className='font-medium'>Разделы:</span>

          {QUICK_LINKS.map((item, index) => (
            <div key={item.href} className='flex items-center gap-x-4'>
              {index > 0 && <span aria-hidden='true'>•</span>}

              <Link
                replace
                href={item.href}
                className='transition-colors hover:text-foreground underline-offset-4 hover:underline'
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
