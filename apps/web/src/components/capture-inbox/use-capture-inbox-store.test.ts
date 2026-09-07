import { beforeEach, describe, expect, it, vi } from "vitest"

import { useCaptureInboxStore } from "./use-capture-inbox-store"

function resetStore() {
  useCaptureInboxStore.setState({ items: [] }, false)
}

describe("useCaptureInboxStore", () => {
  beforeEach(() => {
    localStorage.clear()
    resetStore()
  })

  it("starts with no items", () => {
    expect(useCaptureInboxStore.getState().items).toEqual([])
  })

  it("captures non-empty text as an unsorted item", () => {
    useCaptureInboxStore.getState().capture("Buy milk")

    const items = useCaptureInboxStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({ text: "Buy milk", status: "unsorted" })
    expect(items[0]?.id).toEqual(expect.any(String))
    expect(items[0]?.createdAt).toEqual(expect.any(String))
  })

  it("trims captured text", () => {
    useCaptureInboxStore.getState().capture("  Buy milk  ")
    expect(useCaptureInboxStore.getState().items[0]?.text).toBe("Buy milk")
  })

  it("does not capture empty or whitespace-only text", () => {
    useCaptureInboxStore.getState().capture("   ")
    useCaptureInboxStore.getState().capture("")
    expect(useCaptureInboxStore.getState().items).toHaveLength(0)
  })

  it("tags an item, archiving it with that tag", () => {
    useCaptureInboxStore.getState().capture("Buy milk")
    const id = useCaptureInboxStore.getState().items[0]!.id

    useCaptureInboxStore.getState().tag(id, "task")

    const item = useCaptureInboxStore.getState().items[0]!
    expect(item.status).toBe("archived")
    expect(item.tag).toBe("task")
  })

  it("archives an item without a tag", () => {
    useCaptureInboxStore.getState().capture("Buy milk")
    const id = useCaptureInboxStore.getState().items[0]!.id

    useCaptureInboxStore.getState().archive(id)

    const item = useCaptureInboxStore.getState().items[0]!
    expect(item.status).toBe("archived")
    expect(item.tag).toBeUndefined()
  })

  it("deletes an item entirely", () => {
    useCaptureInboxStore.getState().capture("Buy milk")
    const id = useCaptureInboxStore.getState().items[0]!.id

    useCaptureInboxStore.getState().delete(id)

    expect(useCaptureInboxStore.getState().items).toHaveLength(0)
  })

  it("leaves other items untouched when tagging one item", () => {
    useCaptureInboxStore.getState().capture("Buy milk")
    useCaptureInboxStore.getState().capture("Call dentist")
    const [first, second] = useCaptureInboxStore.getState().items

    useCaptureInboxStore.getState().tag(first!.id, "note")

    const items = useCaptureInboxStore.getState().items
    expect(items.find((item) => item.id === first!.id)?.status).toBe(
      "archived"
    )
    expect(items.find((item) => item.id === second!.id)?.status).toBe(
      "unsorted"
    )
  })

  it("falls back to default state when persisted storage is corrupt", async () => {
    localStorage.setItem("capture-inbox-store", "not valid json{{{")
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

    await useCaptureInboxStore.persist.rehydrate()

    expect(useCaptureInboxStore.getState().items).toEqual([])
    warnSpy.mockRestore()
  })

  it("falls back to default state when persisted items fail schema validation", async () => {
    localStorage.setItem(
      "capture-inbox-store",
      JSON.stringify({
        state: { items: [{ id: "1", status: "not-a-real-status" }] },
        version: 1,
      })
    )
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

    await useCaptureInboxStore.persist.rehydrate()

    expect(useCaptureInboxStore.getState().items).toEqual([])
    warnSpy.mockRestore()
  })
})
