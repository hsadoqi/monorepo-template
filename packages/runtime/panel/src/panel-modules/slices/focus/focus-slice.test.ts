import { describe, expect, it } from "vitest"
import { createFocusSlice, type FocusSlice } from "./focus-slice"

function createTestSlice() {
  let state: FocusSlice
  const set = (
    partial: Partial<FocusSlice> | ((state: FocusSlice) => Partial<FocusSlice>)
  ) => {
    const next = typeof partial === "function" ? partial(state) : partial
    state = { ...state, ...next }
  }
  state = { ...createFocusSlice(set) } as FocusSlice
  return { get: () => state }
}

describe("createFocusSlice", () => {
  it("starts a focus session with an end timestamp in the future", () => {
    const { get } = createTestSlice()
    get().startFocus(60_000)
    expect(get().isRunning).toBe(true)
    expect(get().endTimestamp).toBeGreaterThan(Date.now())
  })

  it("pauses without clearing the end timestamp", () => {
    const { get } = createTestSlice()
    get().startFocus(60_000)
    const endTimestamp = get().endTimestamp
    get().pauseFocus()
    expect(get().isRunning).toBe(false)
    expect(get().endTimestamp).toBe(endTimestamp)
  })

  it("resets to no active session", () => {
    const { get } = createTestSlice()
    get().startFocus(60_000)
    get().resetFocus()
    expect(get().isRunning).toBe(false)
    expect(get().endTimestamp).toBeNull()
  })
})
