import { useCallback, useRef } from 'preact/hooks';

export const useDebounce = (
  callback: (...args: any[]) => void,
  timeout: number = 100,
  deps: any[] = []
) => {
  const timerRef = useRef<number>();
  return useCallback(
    (...args: any) => {
      const currentTimerRef = timerRef.current;
      if (currentTimerRef) {
        clearTimeout(currentTimerRef);
      }
      timerRef.current = window.setTimeout(() => {
        callback(...args);
      }, timeout);
    },
    [timeout, ...deps]
  );
};
