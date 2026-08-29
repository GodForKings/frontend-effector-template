import type { CategoryResponseDto } from '@/shared/api'

import type { CategoryRow } from '../model/types'

/** Рекурсивно разворачивает дерево CategoryResponseDto в плоский список строк */
export const flattenCategories = (
  categories: CategoryResponseDto[],
  parentId: string | null = null,
  parentName: string | null = null,
): CategoryRow[] => {
  return categories.flatMap((cat) => {
    const row: CategoryRow = {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      image: (cat.image as string | null) ?? null,
      isActive: cat.isActive,
      sortOrder: cat.sortOrder,
      parentId,
      parentName,
      childrenCount: cat.children?.length ?? 0,
    }

    const childRows = cat.children ? flattenCategories(cat.children, cat.id, cat.name) : []

    return [row, ...childRows]
  })
}
