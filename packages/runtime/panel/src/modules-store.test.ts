import { beforeEach, describe, expect, it, vi } from "vitest"
import { modulesStore } from "./modules-store"

function resetStore() {
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
}

describe("modulesStore", () => {
  beforeEach(() => {
    localStorage.clear()
    resetStore()
  })

  it("combines notes, focus, and files slices in one store", () => {
    modulesStore.getState().addNote("Buy milk")
    modulesStore.getState().startFocus(60_000)
    modulesStore
      .getState()
      .addFileMetadata({ id: "f1", name: "a.txt", size: 1, addedAt: 0 })

    expect(modulesStore.getState().noteIds).toHaveLength(1)
    expect(modulesStore.getState().isRunning).toBe(true)
    expect(modulesStore.getState().fileIds).toEqual(["f1"])
  })

  it("persists all three slices under one key and restores them together", () => {
    modulesStore.getState().addNote("Buy milk")
    modulesStore.getState().startFocus(60_000)
    modulesStore
      .getState()
      .addFileMetadata({ id: "f1", name: "a.txt", size: 1, addedAt: 0 })

    const raw = localStorage.getItem("panel-modules-store")
    expect(raw).not.toBeNull()
    const parsed = JSON.parse(raw!)
    expect(parsed.state.notes.ids).toHaveLength(1)
    expect(parsed.state.focus.isRunning).toBe(true)
    expect(parsed.state.files.ids).toEqual(["f1"])
  })

  it("falls back to default state when persisted storage is corrupt", async () => {
    localStorage.setItem("panel-modules-store", "not valid json{{{")
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

    await modulesStore.persist.rehydrate()

    expect(modulesStore.getState().noteIds).toEqual([])
    warnSpy.mockRestore()
  })
})
