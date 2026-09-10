import { describe, expect, it } from "vitest"
import {
  scheduleEventItemSchema,
  scheduleEventsPersistedStateSchema,
} from "./schema"

describe("scheduleEventItemSchema", () => {
  it("accepts a valid event", () => {
    const result = scheduleEventItemSchema.safeParse({
      id: "1",
      title: "Buy milk",
      time: "2023-01-01T12:00:00Z",
      createdAt: 0,
    })
    expect(result.success).toBe(true)
  })

  it("rejects an event missing an id", () => {
    const result = scheduleEventItemSchema.safeParse({
      title: "Buy milk",
      time: "2023-01-01T12:00:00Z",
      createdAt: 0,
    })
    expect(result.success).toBe(false)
  })

  it("falls back to defaults for missing title/time/createdAt", () => {
    const result = scheduleEventItemSchema.safeParse({ id: "1" })
    expect(result.success).toBe(true)
    expect(result.data?.title).toBe("Untitled event")
  })

  it("accepts an event with an icon key", () => {
    const result = scheduleEventItemSchema.safeParse({
      id: "1",
      title: "Buy milk",
      time: "2023-01-01T12:00:00Z",
      createdAt: 0,
      icon: "Calendar03Icon",
    })
    expect(result.success).toBe(true)
    expect(result.data?.icon).toBe("Calendar03Icon")
  })

  it("leaves icon undefined when omitted", () => {
    const result = scheduleEventItemSchema.safeParse({
      id: "1",
      title: "Buy milk",
      time: "2023-01-01T12:00:00Z",
      createdAt: 0,
    })
    expect(result.success).toBe(true)
    expect(result.data?.icon).toBeUndefined()
  })
})

describe("scheduleEventsPersistedStateSchema", () => {
  it("accepts a valid entity collection", () => {
    const result = scheduleEventsPersistedStateSchema.safeParse({
      entities: {
        "1": { id: "1", title: "Buy milk", time: "9am", createdAt: 0 },
      },
      ids: ["1"],
    })
    expect(result.success).toBe(true)
  })

  it("rejects an entity missing an id", () => {
    const result = scheduleEventsPersistedStateSchema.safeParse({
      entities: { "1": { title: "Buy milk" } },
      ids: ["1"],
    })
    expect(result.success).toBe(false)
  })
})
