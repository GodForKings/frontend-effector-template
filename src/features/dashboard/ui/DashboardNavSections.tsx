import {
  Cog,
  FolderTree,
  Mails,
  UserCog,
} from 'lucide-react'
import type { FC } from 'react'

import { cn, InfoBlock, PAGES } from '@/shared'

import type { DashboardCardProps, DashboardStats } from '../model'
import { DashboardCard } from './DashboardCard'

interface DashboardNavSectionsProps {
  stats: DashboardStats | null
  isLoading: boolean
}

export const DashboardNavSections: FC<DashboardNavSectionsProps> = ({ stats, isLoading }) => {
  const primaryCards: DashboardCardProps[] = [
    {
      href: PAGES.USERS,
      title: 'Пользователи',
      description: 'Управление учетными записями, роли (USER/ADMIN), блокировка и экспорт базы в CSV',
      metric: stats ? `${stats.totalUsers} аккаунтов` : '0 аккаунтов',
      subMetric: 'Управление доступом',
      icon: UserCog,
      iconBgClass: cn(
        'bg-blue-500/15 border border-blue-500/20',
        'text-blue-600 dark:text-blue-400',
      ),
    },
    {
      href: PAGES.CATEGORIES,
      title: 'Категории каталога',
      description: 'Иерархическая структура каталога, ЧПУ-ссылки, изображения и порядок сортировки',
      metric: stats ? `${stats.totalCategories} категорий` : '0 категорий',
      subMetric: 'Структура каталога',
      icon: FolderTree,
      iconBgClass: cn(
        'bg-emerald-500/15 border border-emerald-500/20',
        'text-emerald-600 dark:text-emerald-400',
      ),
    },
    {
      href: PAGES.SETTINGS,
      title: 'Системные настройки',
      description: 'Режим технического обслуживания (503), глобальный информационный баннер',
      metric: stats?.maintenanceMode ? 'Тех. работы активны' : 'Сайт работает',
      subMetric: 'Конфигурация платформы',
      icon: Cog,
      iconBgClass: cn(
        'bg-violet-500/15 border border-violet-500/20',
        'text-violet-600 dark:text-violet-400',
      ),
    },
    {
      href: PAGES.BROADCASTS,
      title: 'Email-рассылки',
      description: 'Массовые почтовые уведомления пользователей и транзакционные письма',
      metric: 'Resend сервис',
      subMetric: 'Уведомления клиентов',
      icon: Mails,
      iconBgClass: cn(
        'bg-cyan-500/15 border border-cyan-500/20',
        'text-cyan-600 dark:text-cyan-400',
      ),
    },
  ]

  return (
    <div className='space-y-8 pt-2'>
      <section className='space-y-3'>
        <InfoBlock
          title='Основные разделы'
          paragraph='Модули управления системой'
          headerClass='text-lg md:text-lg font-semibold'
          className='flex-row justify-between'
        />

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {primaryCards.map((card) => (
            <DashboardCard key={card.href} {...card} isLoading={isLoading} />
          ))}
        </div>
      </section>
    </div>
  )
}
