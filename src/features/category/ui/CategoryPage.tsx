'use client'

import type { FC } from 'react'

import { CategoryTable } from './CategoryTable'
import { CategoryToolbar } from './CategoryToolbar'

export const CategoryPage: FC = () => {
  return (
    <div className='space-y-6'>
      <CategoryToolbar />

      <CategoryTable />
    </div>
  )
}
