import { describe, expect, it } from "vitest"
import { notesPersistedStateSchema } from "./schema"

describe("notesPersistedStateSchema", () => {
  it("accepts a valid entity collection", () => {
    const result = notesPersistedStateSchema.safeParse({
      entities: { "1": { id: "1", text: "Buy milk", createdAt: 0 } },
      ids: ["1"],
    })
    expect(result.success).toBe(true)
  })

  it("rejects an entity missing required fields", () => {
    const result = notesPersistedStateSchema.safeParse({
      entities: { "1": { id: "1" } },
      ids: ["1"],
    })
    expect(result.success).toBe(false)
  })
})
