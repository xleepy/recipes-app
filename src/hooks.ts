import { useCallback, useEffect, useRef } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useSyncRef<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

export function useDebounceCallback<T extends (...args: any) => void>(
  callback: T,
  delay: number,
  deps: any[]
) {
  const callbackRef = useSyncRef(callback);
  const timeoutRef = useRef<number>();
  return useCallback(
    (...args: any) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay, ...deps]
  );
}
