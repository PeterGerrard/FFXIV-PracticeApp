import { useEffect } from "react";

export function useTimeout(
  callback: () => void,
  delay: number | undefined
): void {
  useEffect(() => {
    let mounted = true;
    if (delay === undefined) {
      return;
    }
    setTimeout(() => {
      if (mounted) return mounted && callback();
    }, delay);
    return () => {
      mounted = false;
    };
  });
}
