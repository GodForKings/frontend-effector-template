'use client'

import { debounce } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

import { DEBOUNCE } from '../config'

export function useDebounce<T>(value: T, delay: number = DEBOUNCE): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  const debouncedSetState = useMemo(
    () => debounce((newValue: T) => setDebouncedValue(newValue), delay),
    [delay],
  )

  useEffect(() => {
    debouncedSetState(value)

    return () => {
      debouncedSetState.cancel()
    }
  }, [value, debouncedSetState])

  return debouncedValue
}
