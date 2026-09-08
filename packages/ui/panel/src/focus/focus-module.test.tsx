import { beforeEach, describe, expect, it } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { modulesStore } from "@repo/runtime-panel"
import { FocusModule } from "./focus-module"

beforeEach(() => {
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

describe("FocusModule", () => {
  it("starts a 25-minute countdown and shows remaining time", () => {
    render(<FocusModule />)
    fireEvent.click(screen.getByRole("button", { name: /start/i }))
    expect(screen.getAllByText(/24:5\d|25:0[01]/)).toBeDefined()
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
