import { useState, useEffect } from "react";

/**
 * Returns false during SSR and the first client render,
 * then true after hydration is complete.
 * Use this to guard any value that comes from a persisted Zustand store
 * to prevent hydration mismatches.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
