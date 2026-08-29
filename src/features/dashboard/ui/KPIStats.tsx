'use client'

import { LayersPlus, ShieldAlert, UserCog, Volume2 } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'

import { cn, PAGES } from '@/shared'
import { Badge, Card, CardContent, CardHeader, CardTitle, Skeleton } from '@/shared/ui/shadcn'

import type { DashboardStats } from '../model'

interface KPIStatsProps {
  stats: DashboardStats | null
  isLoading: boolean
}

export const KPIStats: FC<KPIStatsProps> = ({ stats, isLoading }) => {
  const kpis = [
    {
      title: 'Пользователи',
      value: stats ? stats.totalUsers.toLocaleString('ru-RU') : '0',
      description: 'Всего зарегистрированных аккаунтов',
      icon: UserCog,
      href: PAGES.USERS,
      iconBgClass: cn('bg-blue-500/15 border-blue-500/20', 'text-blue-600 dark:text-blue-400'),
    },
    {
      title: 'Категории каталога',
      value: stats ? stats.totalCategories.toLocaleString('ru-RU') : '0',
      description: 'Активные корневые категории',
      icon: LayersPlus,
      href: PAGES.CATEGORIES,
      iconBgClass: cn(
        'bg-emerald-500/15 border-emerald-500/20',
        'text-emerald-600 dark:text-emerald-400',
      ),
    },
    {
      title: 'Технические работы',
      value: stats?.maintenanceMode ? 'Включены' : 'Выключены',
      description: stats?.maintenanceMode
        ? 'Доступ только для администраторов'
        : 'Сайт открыт для всех',
      badgeText: stats?.maintenanceMode ? '503 Mode' : 'Online',
      badgeVariant: stats?.maintenanceMode ? ('destructive' as const) : ('secondary' as const),
      icon: ShieldAlert,
      href: PAGES.SETTINGS,
      iconBgClass: stats?.maintenanceMode
        ? cn('bg-red-500/15 border-red-500/20', 'text-red-600 dark:text-red-400')
        : cn('bg-emerald-500/15 border-emerald-500/20', 'text-emerald-600 dark:text-emerald-400'),
    },
    {
      title: 'Информационный баннер',
      value: stats?.bannerEnabled ? 'Активен' : 'Отключен',
      description: stats?.bannerEnabled ? 'Отображается в шапке сайта' : 'Скрыт от пользователей',
      icon: Volume2,
      href: PAGES.SETTINGS,
      iconBgClass: cn(
        'bg-purple-500/15 border-purple-500/20',
        'text-purple-600 dark:text-purple-400',
      ),
    },
  ]

  return (
    <div className={cn('grid grid-cols-1 gap-4', 'sm:grid-cols-2 lg:grid-cols-4')}>
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon

        return (
          <Link key={index} href={kpi.href}>
            <Card className='relative overflow-hidden shadow transition-all duration-200 hover:border-primary/50 cursor-pointer'>
              <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  {kpi.title}
                </CardTitle>

                <div
                  className={cn(
                    'p-2.5 rounded-xl border',
                    'transition-transform duration-300 hover:scale-105',
                    kpi.iconBgClass,
                  )}
                >
                  <Icon className='size-4' />
                </div>
              </CardHeader>

              <CardContent className='space-y-2'>
                {isLoading ? (
                  <div className='space-y-2 pt-1'>
                    <Skeleton className='h-7 w-28' />
                    <Skeleton className='h-4 w-36' />
                  </div>
                ) : (
                  <>
                    <div className='flex items-baseline justify-between gap-2'>
                      <span className='text-2xl font-bold tracking-tight text-foreground'>
                        {kpi.value}
                      </span>

                      {kpi.badgeText && (
                        <Badge
                          variant={kpi.badgeVariant || 'secondary'}
                          className='text-[10px] px-1.5 py-0.5 font-medium'
                        >
                          {kpi.badgeText}
                        </Badge>
                      )}
                    </div>

                    <p className='text-xs text-muted-foreground'>{kpi.description}</p>
                  </>
                )}
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
