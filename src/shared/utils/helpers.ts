import { isAxiosError } from 'axios'

import { ENVIRONMENT_CONFIG } from '../config'

const baseUrl = ENVIRONMENT_CONFIG.API_URL?.replace(/\/api$/, '')

/** Для обработки пути к файлам
 * @param url файла
 * @returns строку пути */
export const getPhotoUrl = (url: string): string => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  const cleanUrl = url.startsWith('/') ? url : `/${url}`
  return `${baseUrl}${cleanUrl}`
}

export const formatPhoneDisplay = (input: string): string => {
  if (!input) return ''
  // оставляем только цифры
  let digits = input.replace(/\D/g, '')

  if (!digits) return ''

  // 8XXXXXXXXXX -> 7XXXXXXXXXX
  if (digits.startsWith('8')) {
    digits = '7' + digits.slice(1)
  } else if (digits.startsWith('9')) {
    // Пользователь начал ввод без префикса 7/8 (например, 999...)
    digits = '7' + digits
  }

  // если номер РФ (начинается с 7) — форматируем по маске +7 (XXX) XXX-XX-XX
  if (digits.startsWith('7')) {
    digits = digits.slice(0, 11)
    const d = digits.slice(1) // до 10 цифр после 7
    let s = '+7'

    if (d.length > 0) {
      s += ' (' + d.slice(0, 3)
    }
    if (d.length >= 3) {
      s += ')'
    }
    if (d.length > 3) {
      s += ' ' + d.slice(3, 6)
    }
    if (d.length >= 6) {
      s += '-' + d.slice(6, 8)
    }
    if (d.length >= 8) {
      s += '-' + d.slice(8, 10)
    }

    return s
  }

  // fallback для прочих номеров: до 15 цифр с префиксом +
  return '+' + digits.slice(0, 15)
}

/** Проверка и нормализация пути
 * @param currentPath строку
 * @returns */
export const safeReturnTo = (currentPath: string | null): string | null => {
  if (!currentPath) return null
  // защита от внешних ссылок/мусора
  if (!currentPath.startsWith('/')) return null
  if (currentPath.startsWith('//')) return null
  return currentPath
}

export type FormatDateValue = string | number | Date | null | undefined

export interface FormatDateOptions extends Intl.DateTimeFormatOptions {
  locale?: string
  fallback?: string
}

/** Универсальное форматирование даты
 * @param value дата в формате `string | number | Date`
 * @param options опции форматирования:
 * - `locale` локаль, по умолчанию `'ru-RU'`
 * - `fallback` значение, если дата пустая или невалидная, по умолчанию `'-'`
 * - остальные поля - стандартные `Intl.DateTimeFormatOptions`
 * @returns отформатированная строка даты или `fallback` */
export const formatDate = (value: FormatDateValue, options: FormatDateOptions = {}): string => {
  const { locale = 'ru-RU', fallback = ' - ', ...formatOptions } = options

  if (value === null || value === undefined || value === '') {
    return fallback
  }

  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return fallback
  }

  return new Intl.DateTimeFormat(
    locale,
    Object.keys(formatOptions).length > 0
      ? formatOptions
      : {
          dateStyle: 'medium',
          timeStyle: 'short',
        },
  ).format(date)
}

/** Извлекает человекочитаемое сообщение об ошибке из ответа бэкенда (AxiosError)
 * @param error
 * @param fallback
 * @returns строку с описанием ошибки */
export const getErrorMessage = (error: unknown, fallback: string = 'Произошла ошибка'): string => {
  if (isAxiosError<{ message?: string | string[] }>(error)) {
    if (error.response?.status === 429) {
      return 'У вас слишком большие запросы!'
    }

    const data = error.response?.data

    if (data?.message) {
      return Array.isArray(data.message) ? data.message.join('. ') : data.message
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}

/** Транслитерация кириллицы → латиница */
const TRANSL_MAP: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
}

/** Преобразует строку в slug формат (kebab-case, только латиница/цифры) */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .split('')
    .map((char) => TRANSL_MAP[char] ?? char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Универсальное форматирование суммы в рубли */
export const formatMoney = (amount: string | number | null | undefined): string => {
  if (amount === null || amount === undefined) return '0 ₽'

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(amount))
}
