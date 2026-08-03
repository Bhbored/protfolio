import { useSyncExternalStore } from "react"

export const MOBILE_BREAKPOINT = 768

function getMql(): MediaQueryList {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
}

function subscribe(onStoreChange: () => void): () => void {
  const mql = getMql()
  mql.addEventListener("change", onStoreChange)
  return () => mql.removeEventListener("change", onStoreChange)
}

function getSnapshot(): boolean {
  return getMql().matches
}

function getServerSnapshot(): boolean {
  return true
}

export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
