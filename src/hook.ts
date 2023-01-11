import { useRef } from 'preact/hooks';
// reference: https://github.com/microsoft/fluentui/blob/master/packages/react-hooks/src/useConst.ts
export function useConst<T>(initialValue: T | (() => T)): T {
  const ref = useRef<{ value: T }>();
  if (ref.current === undefined) {
    ref.current = {
      value:
        typeof initialValue === 'function'
          ? //eslint-disable-next-line @typescript-eslint/ban-types
            (initialValue as Function)()
          : initialValue,
    };
  }
  return ref.current.value;
}
