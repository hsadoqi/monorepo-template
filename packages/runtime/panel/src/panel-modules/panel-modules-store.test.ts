import { beforeEach, describe, expect, it, vi } from "vitest"
import { modulesStore } from "./panel-modules-store"

function resetStore() {
  modulesStore.setState(
    {
      noteEntities: {},
      noteIds: [],
      endTimestamp: null,
      isRunning: false,
      fileEntities: {},
      fileIds: [],
      scheduleEntities: {},
      scheduleIds: [],
    },
    false
  )
}

describe("modulesStore", () => {
  beforeEach(() => {
    localStorage.clear()
    resetStore()
  })

  it("combines notes, focus, files, and schedules slices in one store", () => {
    modulesStore.getState().addNote("Buy milk")
    modulesStore.getState().startFocus(60_000)
    modulesStore
      .getState()
      .addFileMetadata({ id: "f1", name: "a.txt", size: 1, addedAt: 0 })
    modulesStore.getState().addScheduleEvent("Team sync", "Today, 2:00 PM")

    expect(modulesStore.getState().noteIds).toHaveLength(1)
    expect(modulesStore.getState().isRunning).toBe(true)
    expect(modulesStore.getState().fileIds).toEqual(["f1"])
    expect(modulesStore.getState().scheduleIds).toHaveLength(1)
  })

  it("persists all four slices under one key and restores them together", () => {
    modulesStore.getState().addNote("Buy milk")
    modulesStore.getState().startFocus(60_000)
    modulesStore
      .getState()
      .addFileMetadata({ id: "f1", name: "a.txt", size: 1, addedAt: 0 })
    modulesStore.getState().addScheduleEvent("Team sync", "Today, 2:00 PM")

    const raw = localStorage.getItem("panel-modules-store")
    expect(raw).not.toBeNull()
    const parsed = JSON.parse(raw!)
    expect(parsed.state.notes.ids).toHaveLength(1)
    expect(parsed.state.focus.isRunning).toBe(true)
    expect(parsed.state.files.ids).toEqual(["f1"])
    expect(parsed.state.schedules.ids).toHaveLength(1)
  })

  it("falls back to default state when persisted storage is corrupt", async () => {
    localStorage.setItem("panel-modules-store", "not valid json{{{")
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

    await modulesStore.persist.rehydrate()

    expect(modulesStore.getState().noteIds).toEqual([])
    warnSpy.mockRestore()
  })

  it("restores notes and files into their real state fields on rehydrate", async () => {
    localStorage.setItem(
      "panel-modules-store",
      JSON.stringify({
        state: {
          notes: {
            entities: { n1: { id: "n1", text: "Buy milk", createdAt: 0 } },
            ids: ["n1"],
          },
          focus: { endTimestamp: null, isRunning: false },
          files: {
            entities: { f1: { id: "f1", name: "a.txt", size: 1, addedAt: 0 } },
            ids: ["f1"],
          },
          schedules: { entities: {}, ids: [] },
        },
        version: 1,
      })
    )

    await modulesStore.persist.rehydrate()

    expect(modulesStore.getState().noteEntities.n1?.text).toBe("Buy milk")
    expect(modulesStore.getState().noteIds).toEqual(["n1"])
    expect(modulesStore.getState().fileEntities.f1?.name).toBe("a.txt")
    expect(modulesStore.getState().fileIds).toEqual(["f1"])
  })
})
