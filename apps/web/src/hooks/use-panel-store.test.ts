import { beforeEach, describe, expect, it, vi } from "vitest"
import { panelStore } from "./use-panel-store"

function resetStore() {
  panelStore.setState(
    {
      isOpen: false,
      isLocked: false,
      activeModuleIds: [],
      paneSizes: {},
      notes: { items: [] },
      focus: { endTimestamp: null, isRunning: false },
      files: { items: [] },
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
    expect(panelStore.getState().activeModuleIds).toEqual([
      "schedule",
      "notes",
    ])
  })

  it("adds, updates, and deletes a note", () => {
    panelStore.getState().addNote("Buy milk")
    const id = panelStore.getState().notes.items[0]!.id
    panelStore.getState().updateNote(id, "Buy oat milk")
    expect(panelStore.getState().notes.items[0]!.text).toBe("Buy oat milk")
    panelStore.getState().deleteNote(id)
    expect(panelStore.getState().notes.items).toHaveLength(0)
  })

  it("starts, pauses, and resets focus", () => {
    panelStore.getState().startFocus(10 * 60 * 1000)
    expect(panelStore.getState().focus.isRunning).toBe(true)
    panelStore.getState().pauseFocus()
    expect(panelStore.getState().focus.isRunning).toBe(false)
    expect(panelStore.getState().focus.endTimestamp).not.toBeNull()
    panelStore.getState().resetFocus()
    expect(panelStore.getState().focus.endTimestamp).toBeNull()
  })

  it("adds and removes file metadata", () => {
    panelStore.getState().addFileMetadata({
      id: "f1",
      name: "notes.txt",
      size: 1024,
      addedAt: Date.now(),
    })
    expect(panelStore.getState().files.items).toHaveLength(1)
    panelStore.getState().removeFileMetadata("f1")
    expect(panelStore.getState().files.items).toHaveLength(0)
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
