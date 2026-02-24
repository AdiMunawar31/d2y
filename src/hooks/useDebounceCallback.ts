import { useRef, useEffect, useCallback } from "react";

export function useDebounceCallback<T>(
  callback: (value: T) => void,
  delay = 300
) {
  const timeoutRef = useRef<number | undefined>(delay);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (value: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay]
  );
}
