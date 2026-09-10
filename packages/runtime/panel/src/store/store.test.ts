import { beforeEach, describe, expect, it, vi } from "vitest"
import { panelStore } from "./store"

function resetStore() {
  panelStore.setState(
    {
      isOpen: false,
      isLocked: false,
      activeModuleIds: [],
      panelSizes: {},
    },
    false
  )
}

describe("panelStore", () => {
  beforeEach(() => {
    localStorage.clear()
    resetStore()
  })

  it("toggles open/closed", () => {
    expect(panelStore.getState().isOpen).toBe(false)
    panelStore.getState().toggleOpen()
    expect(panelStore.getState().isOpen).toBe(true)
  })

  it("toggles lock", () => {
    panelStore.getState().toggleLock()
    expect(panelStore.getState().isLocked).toBe(true)
  })

  it("toggles module visibility, adding to the end of activeModuleIds", () => {
    panelStore.getState().toggleModuleVisibility("notes")
    expect(panelStore.getState().activeModuleIds).toContain("notes")
    panelStore.getState().toggleModuleVisibility("notes")
    expect(panelStore.getState().activeModuleIds).not.toContain("notes")
  })

  it("reorders a visible module", () => {
    panelStore.getState().toggleModuleVisibility("notes")
    panelStore.getState().toggleModuleVisibility("schedule")
    panelStore.getState().reorderModule("schedule", "up")
    expect(panelStore.getState().activeModuleIds).toEqual(["schedule", "notes"])
  })

  it("sets panel sizes", () => {
    panelStore.getState().setPanelSizes({ notes: 60, schedule: 40 })
    expect(panelStore.getState().panelSizes).toEqual({
      notes: 60,
      schedule: 40,
    })
  })

  it("falls back to default state when persisted storage is corrupt", async () => {
    localStorage.setItem("panel-store", "not valid json{{{")
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

    await panelStore.persist.rehydrate()

    expect(panelStore.getState().activeModuleIds).toEqual([])
    warnSpy.mockRestore()
  })

  it("falls back to default state when persisted data fails schema validation", async () => {
    localStorage.setItem(
      "panel-store",
      JSON.stringify({
        state: { isOpen: "not-a-boolean" },
        version: 1,
      })
    )
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

    await panelStore.persist.rehydrate()

    expect(panelStore.getState().isOpen).toBe(false)
    warnSpy.mockRestore()
  })

  it("migrates a stale empty activeModuleIds from before the default changed", async () => {
    localStorage.setItem(
      "panel-store",
      JSON.stringify({
        state: {
          isOpen: false,
          isLocked: false,
          activeModuleIds: [],
          panelSizes: {},
        },
        version: 1,
      })
    )

    await panelStore.persist.rehydrate()

    expect(panelStore.getState().activeModuleIds).toEqual([
      "notes",
      "files",
      "schedule",
      "focus",
    ])
  })

  it("preserves an intentionally empty activeModuleIds once persisted at the current version", async () => {
    localStorage.setItem(
      "panel-store",
      JSON.stringify({
        state: {
          isOpen: false,
          isLocked: false,
          activeModuleIds: [],
          panelSizes: {},
        },
        version: 2,
      })
    )

    await panelStore.persist.rehydrate()

    expect(panelStore.getState().activeModuleIds).toEqual([])
  })

  it("does not throw when persisting a write fails, and keeps the in-memory update", () => {
    const originalSetItem = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (key === "panel-store") {
        throw new Error("QuotaExceededError (simulated)")
      }
      return originalSetItem.call(this, key, value)
    }
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

    try {
      expect(() => panelStore.getState().toggleOpen()).not.toThrow()
      expect(panelStore.getState().isOpen).toBe(true)
    } finally {
      Storage.prototype.setItem = originalSetItem
      warnSpy.mockRestore()
    }
  })
})
