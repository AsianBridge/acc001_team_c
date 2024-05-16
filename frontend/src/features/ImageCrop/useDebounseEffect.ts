import { useEffect, DependencyList, useCallback } from "react";

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps: DependencyList = [],
) {
  const memoizedFn = useCallback(fn, [fn, deps]);

  useEffect(() => {
    if (deps !== undefined) {
      const t = setTimeout(() => {
        memoizedFn();
      }, waitTime);

      return () => {
        clearTimeout(t);
      };
    }
  }, [memoizedFn, waitTime, deps]);
}
