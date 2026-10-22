"use client";

import { useSyncExternalStore } from "react";

/** Media query reativa. No servidor (e no primeiro render) retorna `false`. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Desktop com mouse e sem preferência por movimento reduzido: onde os efeitos finos rodam. */
export function useEfeitosDesktop(): boolean {
  return useMediaQuery("(pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)");
}
