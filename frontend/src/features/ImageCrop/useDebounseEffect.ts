import { useEffect, DependencyList } from 'react'

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
) {
  useEffect(() => {
    if (deps !== undefined) {
      const t = setTimeout(() => {
        fn()
      }, waitTime)

      return () => {
        clearTimeout(t)
      }
    }
  }, deps)
}
