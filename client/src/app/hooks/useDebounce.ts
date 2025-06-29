import { useState, useEffect } from "react"

export const useDebounce = <T>(value: T, timeout: number = 800): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, timeout)

    return () => {
      clearTimeout(handler)
    }
  }, [value, timeout])

  return debouncedValue
}
