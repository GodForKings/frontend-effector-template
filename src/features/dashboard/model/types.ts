import type { LucideIcon } from 'lucide-react'

export interface DashboardStats {
  totalUsers: number
  totalCategories: number
  maintenanceMode: boolean
  bannerEnabled: boolean
}

export interface DashboardCardProps {
  href: string
  title: string
  description: string
  icon: LucideIcon
  iconBgClass: string
  metric?: string
  subMetric?: string
  isLoading?: boolean
}
