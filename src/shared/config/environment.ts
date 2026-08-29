export const ENVIRONMENT_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
} as const

export type EnvironmentConfig = typeof ENVIRONMENT_CONFIG

export const DEBOUNCE: number = 600
export const PAGINATION_SIZE: number = 20

/** Разрешенные типы под изображения */
export const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp']

/* реальный урл в таком же формате из папки: /pdf/настоящееИмя.pdf */
export const TERMS = '/pdf/example.pdf'
export const PRIVACY = '/pdf/example.pdf'
export const GUIDE = '/pdf/example.pdf'
