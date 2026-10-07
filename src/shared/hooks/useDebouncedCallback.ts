'use client'

import { debounce, type DebouncedFunc } from 'lodash'
import { useEffect, useMemo } from 'react'

import { DEBOUNCE } from '../config'

/**
 * Хук для создания стабильной debounced-функции (коллбэка).
 * Предоставляет метод .cancel() для мгновенной отмены отложенного вызова
 * и автоматически отменяет таймер при размонтировании компонента.
 *
 * @param callback Функция, вызов которой нужно отложить
 * @param delay Задержка в миллисекундах (по умолчанию DEBOUNCE = 600ms)
 * @returns Debounced-функция с методами .cancel() и .flush()
 */
export function useDebouncedCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
  delay: number = DEBOUNCE,
): DebouncedFunc<(...args: Args) => Return> {
  const debouncedCallback = useMemo(() => {
    return debounce(callback, delay)
  }, [callback, delay])

  useEffect(() => {
    return () => {
      debouncedCallback.cancel()
    }
  }, [debouncedCallback])

  return debouncedCallback
}
