import { describe, expect, it } from "vitest"
import { captureInboxPersistedStateSchema } from "./schema"

describe("captureInboxPersistedStateSchema", () => {
  it("accepts an empty normalized collection", () => {
    const result = captureInboxPersistedStateSchema.safeParse({
      entities: {},
      ids: [],
    })
    expect(result.success).toBe(true)
  })

  it("accepts a valid unsorted item with no tag", () => {
    const result = captureInboxPersistedStateSchema.safeParse({
      entities: {
        "1": {
          id: "1",
          text: "Buy milk",
          createdAt: new Date("2026-09-07T12:00:00.000Z").getTime(),
          status: "unsorted",
        },
      },
      ids: ["1"],
    })
    expect(result.success).toBe(true)
  })

  it("accepts a valid archived item with a tag", () => {
    const result = captureInboxPersistedStateSchema.safeParse({
      entities: {
        "1": {
          id: "1",
          text: "Buy milk",
          createdAt: new Date("2026-09-07T12:00:00.000Z").getTime(),
          status: "archived",
          type: "task",
        },
      },
      ids: ["1"],
    })
    expect(result.success).toBe(true)
  })

  it("rejects an item with an invalid status", () => {
    const result = captureInboxPersistedStateSchema.safeParse({
      entities: {
        "1": {
          id: "1",
          text: "Buy milk",
          createdAt: new Date("2026-09-07T12:00:00.000Z").getTime(),
          status: "done",
        },
      },
      ids: ["1"],
    })
    expect(result.success).toBe(false)
  })

  it("rejects an item with an invalid tag", () => {
    const result = captureInboxPersistedStateSchema.safeParse({
      entities: {
        "1": {
          id: "1",
          text: "Buy milk",
          createdAt: new Date().getTime(),
          status: "archived",
          type: "project",
        },
      },
      ids: ["1"],
    })
    expect(result.success).toBe(false)
  })

  it("rejects a non-object payload", () => {
    const result = captureInboxPersistedStateSchema.safeParse("not-an-object")
    expect(result.success).toBe(false)
  })

  it("rejects a payload missing the normalized collection fields", () => {
    const result = captureInboxPersistedStateSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})
