import { describe, expect, it } from "vitest"
import { panelPersistedStateSchema } from "./schema"

const validState = {
  isOpen: false,
  isLocked: false,
  activeModuleIds: ["notes"],
  paneSizes: { notes: 100 },
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
})
