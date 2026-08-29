'use client'

import { useGate, useUnit } from 'effector-react'
import type { FC } from 'react'

import { dashboardModels } from '../model'
import { DashboardHero } from './DashboardHero'
import { DashboardNavSections } from './DashboardNavSections'
import { KPIStats } from './KPIStats'

export const DashboardPage: FC = () => {
  useGate(dashboardModels.gates.DashboardGate)

  const [stats, isLoading] = useUnit([
    dashboardModels.stores.$stats,
    dashboardModels.stores.$isLoading,
  ])

  return (
    <div className='space-y-6 pb-6'>
      <DashboardHero />

      <KPIStats stats={stats} isLoading={isLoading} />

      <DashboardNavSections stats={stats} isLoading={isLoading} />
    </div>
  )
}
