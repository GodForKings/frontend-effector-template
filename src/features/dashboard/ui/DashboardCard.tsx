import Link from 'next/link'
import type { FC } from 'react'

import { cn } from '@/shared'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/shared/ui/shadcn'

import type { DashboardCardProps } from '../model/types'

export const DashboardCard: FC<DashboardCardProps> = (props) => {
  const { href, title, description, metric, subMetric, icon: Icon, iconBgClass, isLoading } = props

  const hasMetrics = metric !== undefined || subMetric !== undefined

  return (
    <Link href={href} className='group block no-underline'>
      <Card
        className={cn(
          'h-full gap-2 transition-all duration-200 cursor-pointer select-none',
          'hover:shadow-md hover:border-primary hover:translate-y-0.5 active:scale-96',
        )}
      >
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <div className='space-y-1'>
            <CardTitle className='text-lg font-semibold transition-colors group-hover:text-primary/80'>
              {title}
            </CardTitle>

            <CardDescription className='text-xs line-clamp-2'>{description}</CardDescription>
          </div>

          <div className={cn('p-2.5 rounded-xl transition-colors duration-200', iconBgClass)}>
            <Icon className='size-5' />
          </div>
        </CardHeader>

        {hasMetrics && (
          <CardContent
            className={cn(
              'border-t border-border rounded-t-xl mt-2 pt-2',
              'flex flex-col items-start justify-center gap-1',
            )}
          >
            {isLoading ? (
              <>
                <Skeleton className='h-7 min-w-24' />

                <Skeleton className='h-4 min-w-60' />
              </>
            ) : (
              <>
                {metric !== undefined && <div className='text-xl font-semibold'>{metric}</div>}

                {subMetric !== undefined && (
                  <p className='text-xs text-muted-foreground'>{subMetric}</p>
                )}
              </>
            )}
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
