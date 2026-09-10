import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { fireEvent, screen } from "@testing-library/react"
import { renderWithModulesStore } from "../../../test-utils/render-with-modules-store"
import { createModulesStore, type ModulesStoreApi } from "@repo/runtime-panel"
import { OverviewModule } from "./overview-module"

let modulesStore: ModulesStoreApi

describe("OverviewModule", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-09-10T15:00:00.000Z"))
    modulesStore = createModulesStore(1)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("creates schedule events through the schedule slice contract", () => {
    renderWithModulesStore(<OverviewModule />, modulesStore)

    fireEvent.click(screen.getByRole("button", { name: /15-min check-in/i }))
    fireEvent.click(screen.getByRole("button", { name: /30-min 1:1/i }))

    const { scheduleEntities, scheduleIds } = modulesStore.getState()
    expect(scheduleIds).toHaveLength(2)
    expect(scheduleEntities[scheduleIds[0]!]).toMatchObject({
      title: "Check-in",
      time: "2026-09-10T15:00:00.000Z",
      icon: "Clock",
    })
    expect(scheduleEntities[scheduleIds[1]!]).toMatchObject({
      title: "1:1",
      time: "2026-09-10T15:00:00.000Z",
      icon: "Team",
    })
  })

  it("creates a blank note through the notes slice contract", () => {
    renderWithModulesStore(<OverviewModule />, modulesStore)

    fireEvent.click(screen.getByRole("button", { name: /create new note/i }))

    const { noteEntities, noteIds } = modulesStore.getState()
    expect(noteIds).toHaveLength(1)
    expect(noteEntities[noteIds[0]!]!.text).toBe("")
  })

  it("starts the shared 25-minute focus timer", () => {
    renderWithModulesStore(<OverviewModule />, modulesStore)

    fireEvent.click(screen.getByRole("button", { name: /focus session/i }))

    expect(modulesStore.getState().isRunning).toBe(true)
    expect(modulesStore.getState().endTimestamp).toBe(
      new Date("2026-09-10T15:25:00.000Z").getTime()
    )
  })
})
