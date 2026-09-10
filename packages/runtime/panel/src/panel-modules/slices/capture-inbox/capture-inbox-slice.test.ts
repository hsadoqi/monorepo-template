import { describe, expect, it } from "vitest"
import {
  createCaptureInboxItemsSlice,
  type CaptureInboxItemsSlice,
} from "./capture-inbox-slice"

function createTestSlice() {
  let state: CaptureInboxItemsSlice
  const set = (
    partial:
      | Partial<CaptureInboxItemsSlice>
      | ((state: CaptureInboxItemsSlice) => Partial<CaptureInboxItemsSlice>)
  ) => {
    const next = typeof partial === "function" ? partial(state) : partial
    state = { ...state, ...next }
  }
  state = { ...createCaptureInboxItemsSlice(set) } as CaptureInboxItemsSlice
  return { get: () => state }
}

describe("createCaptureInboxItemsSlice", () => {
  it("adds inbox item keyed by id", () => {
    const { get } = createTestSlice()
    get().addInboxItem({
      id: "f1",
      text: "Buy milk",
      createdAt: new Date("2026-09-07T12:00:00.000Z").getTime(),
      status: "unsorted",
    })
    expect(get().inboxItemIds).toEqual(["f1"])
    expect(get().inboxItemEntities.f1?.text).toBe("Buy milk")
  })

  it("removes inbox item", () => {
    const { get } = createTestSlice()
    get().addInboxItem({
      id: "f1",
      text: "Buy milk",
      createdAt: new Date("2026-09-07T12:00:00.000Z").getTime(),
      status: "unsorted",
    })
    get().removeInboxItem("f1")
    expect(get().inboxItemIds).toHaveLength(0)
    expect(get().inboxItemEntities.f1).toBeUndefined()
  })
})
