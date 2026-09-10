import { describe, expect, it } from "vitest"

import { captureInboxPersistedStateSchema } from "./capture-inbox-schema"

describe("captureInboxPersistedStateSchema", () => {
  it("accepts an empty items array", () => {
    const result = captureInboxPersistedStateSchema.safeParse({ items: [] })
    expect(result.success).toBe(true)
  })

  it("accepts a valid unsorted item with no tag", () => {
    const result = captureInboxPersistedStateSchema.safeParse({
      items: [
        {
          id: "1",
          text: "Buy milk",
          createdAt: "2026-09-07T12:00:00.000Z",
          status: "unsorted",
        },
      ],
    })
    expect(result.success).toBe(true)
  })

  it("accepts a valid archived item with a tag", () => {
    const result = captureInboxPersistedStateSchema.safeParse({
      items: [
        {
          id: "1",
          text: "Buy milk",
          createdAt: "2026-09-07T12:00:00.000Z",
          status: "archived",
          tag: "task",
        },
      ],
    })
    expect(result.success).toBe(true)
  })

  it("rejects an item with an invalid status", () => {
    const result = captureInboxPersistedStateSchema.safeParse({
      items: [
        {
          id: "1",
          text: "Buy milk",
          createdAt: "2026-09-07T12:00:00.000Z",
          status: "done",
        },
      ],
    })
    expect(result.success).toBe(false)
  })

  it("rejects an item with an invalid tag", () => {
    const result = captureInboxPersistedStateSchema.safeParse({
      items: [
        {
          id: "1",
          text: "Buy milk",
          createdAt: "2026-09-07T12:00:00.000Z",
          status: "archived",
          tag: "project",
        },
      ],
    })
    expect(result.success).toBe(false)
  })

  it("rejects a non-object payload", () => {
    const result = captureInboxPersistedStateSchema.safeParse("not-an-object")
    expect(result.success).toBe(false)
  })

  it("rejects a payload missing items", () => {
    const result = captureInboxPersistedStateSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})
