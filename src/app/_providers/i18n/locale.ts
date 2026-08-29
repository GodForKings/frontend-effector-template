import { cookies } from 'next/headers'

import { defaultLocale } from './config'
import { Locale } from './types'

const COOKIE_NAME = 'NEXT_LOCALE'

const getLocale = async () => {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale
}

const setLocale = async (locale?: string) => {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, (locale as Locale) || defaultLocale)
}

export { getLocale, setLocale }
