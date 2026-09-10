import type { FocusPersistedState } from "@repo/domain-panel/focus"

export interface FocusSlice extends FocusPersistedState {
  startFocus: (durationMs: number) => void
  pauseFocus: () => void
  resetFocus: () => void
}

type SetSlice = (
  partial: Partial<FocusSlice> | ((state: FocusSlice) => Partial<FocusSlice>)
) => void

export function createFocusSlice(set: SetSlice): FocusSlice {
  return {
    endTimestamp: null,
    isRunning: false,

    startFocus: (durationMs) =>
      set({ endTimestamp: Date.now() + durationMs, isRunning: true }),
    pauseFocus: () => set({ isRunning: false }),
    resetFocus: () => set({ endTimestamp: null, isRunning: false }),
  }
}
