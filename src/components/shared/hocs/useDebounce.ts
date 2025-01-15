import { useEffect, useState } from 'react'

// 0.8초 디바운스
const useDebounce = <T = any>(value: T, delay: number = 800) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [delay, value])

  return debouncedValue
}

export default useDebounce
