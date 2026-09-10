import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { renderWithModulesStore } from "../../../test-utils/render-with-modules-store"
import { createModulesStore, type ModulesStoreApi } from "@repo/runtime-panel"
import { FocusModule } from "./focus-module"

let modulesStore: ModulesStoreApi

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date("2026-09-10T10:00:00Z"))
  modulesStore = createModulesStore(1)
})

afterEach(() => {
  vi.useRealTimers()
})

describe("FocusModule", () => {
  it("starts a 25-minute countdown and shows remaining time", () => {
    renderWithModulesStore(<FocusModule />, modulesStore)
    vi.setSystemTime(new Date("2026-09-10T10:00:03Z"))
    fireEvent.click(screen.getByRole("button", { name: /start/i }))
    expect(screen.getByText("25:00")).toBeDefined()
    expect(modulesStore.getState().isRunning).toBe(true)
  })

  it("computes remaining time from a persisted endTimestamp set before mount", () => {
    modulesStore.getState().startFocus(10 * 60 * 1000)
    renderWithModulesStore(<FocusModule />, modulesStore)
    expect(screen.getAllByText(/09:5\d|10:00/).length).toBeGreaterThan(0)
  })

  it("pauses and resets", () => {
    renderWithModulesStore(<FocusModule />, modulesStore)
    fireEvent.click(screen.getByRole("button", { name: /start/i }))
    fireEvent.click(screen.getByRole("button", { name: /pause/i }))
    expect(modulesStore.getState().isRunning).toBe(false)
    fireEvent.click(screen.getByRole("button", { name: /reset/i }))
    expect(modulesStore.getState().endTimestamp).toBeNull()
  })
})
