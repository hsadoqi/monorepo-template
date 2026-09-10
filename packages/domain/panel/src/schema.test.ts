import { describe, expect, it } from "vitest"
import { panelPersistedStateSchema } from "./schema"

const validState = {
  isOpen: false,
  isLocked: false,
  activeModuleIds: ["notes"],
  panelSizes: { notes: 100 },
}

describe("panelPersistedStateSchema", () => {
  it("accepts a valid persisted state", () => {
    expect(panelPersistedStateSchema.safeParse(validState).success).toBe(true)
  })

  it("rejects a state with the wrong type for isOpen", () => {
    const result = panelPersistedStateSchema.safeParse({
      ...validState,
      isOpen: "not-a-boolean",
    })
    expect(result.success).toBe(false)
  })

  it("rejects activeModuleIds containing a non-string", () => {
    const result = panelPersistedStateSchema.safeParse({
      ...validState,
      activeModuleIds: [1, 2],
    })
    expect(result.success).toBe(false)
  })

  it("rejects panelSizes with a non-number value", () => {
    const result = panelPersistedStateSchema.safeParse({
      ...validState,
      panelSizes: { notes: "50%" },
    })
    expect(result.success).toBe(false)
  })

  it("accepts an empty panelSizes map", () => {
    const result = panelPersistedStateSchema.safeParse({
      ...validState,
      panelSizes: {},
    })
    expect(result.success).toBe(true)
  })
})
