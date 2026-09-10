import { beforeEach, describe, expect, it, vi } from "vitest"
import { createPanelStore } from "./store"

const panelStore = createPanelStore(3)

function resetStore() {
  panelStore.setState(
    {
      isOpen: false,
      isLocked: false,
      moduleIds: [],
      panelSizes: {},
      activeModuleId: "notes",
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

  it("toggles module visibility, adding to the end of moduleIds", () => {
    panelStore.getState().toggleModuleVisibility("notes")
    expect(panelStore.getState().moduleIds).toContain("notes")
    panelStore.getState().toggleModuleVisibility("notes")
    expect(panelStore.getState().moduleIds).not.toContain("notes")
  })

  it("reorders a visible module", () => {
    panelStore.getState().toggleModuleVisibility("notes")
    panelStore.getState().toggleModuleVisibility("schedule")
    panelStore.getState().reorderModule("schedule", "up")
    expect(panelStore.getState().moduleIds).toEqual(["schedule", "notes"])
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

    expect(panelStore.getState().moduleIds).toEqual([])
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

  it("migrates a stale empty moduleIds from before the default changed", async () => {
    localStorage.setItem(
      "panel-store",
      JSON.stringify({
        state: {
          isOpen: false,
          isLocked: false,
          moduleIds: [],
          panelSizes: {},
          activeModuleId: "notes",
        },
        version: 1,
      })
    )

    await panelStore.persist.rehydrate()

    expect(panelStore.getState().moduleIds).toEqual([
      "overview",
      "notes",
      "files",
      "schedules",
      "focus",
      "capture-inbox",
    ])
  })

  it("migrates a stale empty activeModuleId from before the default changed", async () => {
    localStorage.setItem(
      "panel-store",
      JSON.stringify({
        state: {
          isOpen: false,
          isLocked: false,
          moduleIds: ["notes", "files", "schedules", "focus", "capture-inbox"],
          panelSizes: {},
          activeModuleId: "",
        },
        version: 1,
      })
    )

    await panelStore.persist.rehydrate()

    expect(panelStore.getState().activeModuleId).toEqual("overview")
  })

  it("preserves an intentionally empty moduleIds once persisted at the current version", async () => {
    localStorage.setItem(
      "panel-store",
      JSON.stringify({
        state: {
          isOpen: false,
          isLocked: false,
          moduleIds: [],
          panelSizes: {},
          activeModuleId: "notes",
        },
        version: 3,
      })
    )

    await panelStore.persist.rehydrate()

    expect(panelStore.getState().moduleIds).toEqual([])
  })

  it("preserves an intentionally empty activeModuleId once persisted at the current version", async () => {
    localStorage.setItem(
      "panel-store",
      JSON.stringify({
        state: {
          isOpen: false,
          isLocked: false,
          moduleIds: ["notes", "files", "schedules", "focus", "capture-inbox"],
          panelSizes: {},
          activeModuleId: "",
        },
        version: 3,
      })
    )

    await panelStore.persist.rehydrate()

    expect(panelStore.getState().activeModuleId).toEqual("")
  })

  it("adds overview ahead of an existing module order during version 2 migration", async () => {
    localStorage.setItem(
      "panel-store",
      JSON.stringify({
        state: {
          isOpen: true,
          isLocked: true,
          moduleIds: ["focus", "notes"],
          panelSizes: { focus: 60, notes: 40 },
          activeModuleId: "focus",
        },
        version: 2,
      })
    )

    await panelStore.persist.rehydrate()

    expect(panelStore.getState()).toMatchObject({
      isOpen: true,
      isLocked: true,
      moduleIds: ["overview", "focus", "notes"],
      panelSizes: { focus: 60, notes: 40 },
      activeModuleId: "focus",
    })
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
