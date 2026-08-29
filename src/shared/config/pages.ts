/** Конфиг страниц для авторизованного администратора */
export const PAGES = {
  MAIN: '/',
  USERS: '/users',
  CATEGORIES: '/categories',
  SETTINGS: '/settings',
  BROADCASTS: '/broadcasts',
} as const

/** Конфиг публичных страниц */
export const PUBLIC_PAGES = {
  LOGIN: '/login',
	REG:'/reg',
} as const
