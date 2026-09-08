/**
 * SSR-safe `localStorage` accessor for a persist middleware's `getStorage`
 * option: returns `undefined` during SSR or when storage is unavailable
 * (private browsing, quota, disabled), so the store degrades to in-memory
 * only instead of throwing.
 *
 * The probe key is written and immediately removed, never inspected, so one
 * shared key is safe to reuse across every store calling this — there is
 * nothing to namespace per caller.
 */
export function getLocalStorage(): Storage | undefined {
  if (typeof window === "undefined") return undefined
  try {
    const probe = "__zustand_storage_probe__"
    window.localStorage.setItem(probe, probe)
    window.localStorage.removeItem(probe)
    return window.localStorage
  } catch {
    return undefined
  }
}
