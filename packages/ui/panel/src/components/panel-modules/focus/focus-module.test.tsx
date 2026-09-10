import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { modulesStore } from "@repo/runtime-panel"
import { FocusModule } from "./focus-module"

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date("2026-09-10T10:00:00Z"))
  modulesStore.setState(
    {
      noteEntities: {},
      noteIds: [],
      endTimestamp: null,
      isRunning: false,
      fileEntities: {},
      fileIds: [],
    },
    false
  )
})

afterEach(() => {
  vi.useRealTimers()
})

describe("FocusModule", () => {
  it("starts a 25-minute countdown and shows remaining time", () => {
    render(<FocusModule />)
    vi.setSystemTime(new Date("2026-09-10T10:00:03Z"))
    fireEvent.click(screen.getByRole("button", { name: /start/i }))
    expect(screen.getByText("25:00")).toBeDefined()
    expect(modulesStore.getState().isRunning).toBe(true)
  })

  it("computes remaining time from a persisted endTimestamp set before mount", () => {
    modulesStore.getState().startFocus(10 * 60 * 1000)
    render(<FocusModule />)
    expect(screen.getAllByText(/09:5\d|10:00/).length).toBeGreaterThan(0)
  })

  it("pauses and resets", () => {
    render(<FocusModule />)
    fireEvent.click(screen.getByRole("button", { name: /start/i }))
    fireEvent.click(screen.getByRole("button", { name: /pause/i }))
    expect(modulesStore.getState().isRunning).toBe(false)
    fireEvent.click(screen.getByRole("button", { name: /reset/i }))
    expect(modulesStore.getState().endTimestamp).toBeNull()
  })
})
