import { describe, expect, it } from "vitest"
import { createSchedulesSlice, type SchedulesSlice } from "./schedule-slice"

function createTestSlice() {
  let state: SchedulesSlice
  const set = (
    partial:
      | Partial<SchedulesSlice>
      | ((state: SchedulesSlice) => Partial<SchedulesSlice>)
  ) => {
    const next = typeof partial === "function" ? partial(state) : partial
    state = { ...state, ...next }
  }
  state = { ...createSchedulesSlice(set) } as SchedulesSlice
  return { get: () => state }
}

describe("createSchedulesSlice", () => {
  it("adds a schedule event as an entity keyed by id, generating id and createdAt", () => {
    const { get } = createTestSlice()
    get().addScheduleEvent("Team sync", "Today, 2:00 PM")
    const [id] = get().scheduleIds
    expect(id).toEqual(expect.any(String))
    expect(get().scheduleEntities[id!]?.title).toBe("Team sync")
    expect(get().scheduleEntities[id!]?.time).toBe("Today, 2:00 PM")
    expect(get().scheduleEntities[id!]?.createdAt).toEqual(expect.any(Number))
  })

  it("adds a schedule event with an optional icon key", () => {
    const { get } = createTestSlice()
    get().addScheduleEvent("Team sync", "Today, 2:00 PM", "Calendar03Icon")
    const [id] = get().scheduleIds
    expect(get().scheduleEntities[id!]?.icon).toBe("Calendar03Icon")
  })

  it("leaves icon undefined when not provided", () => {
    const { get } = createTestSlice()
    get().addScheduleEvent("Team sync", "Today, 2:00 PM")
    const [id] = get().scheduleIds
    expect(get().scheduleEntities[id!]?.icon).toBeUndefined()
  })

  it("deletes a schedule event, removing it from both entities and ids", () => {
    const { get } = createTestSlice()
    get().addScheduleEvent("Team sync", "Today, 2:00 PM")
    const [id] = get().scheduleIds
    get().deleteScheduleEvent(id!)
    expect(get().scheduleIds).toHaveLength(0)
    expect(get().scheduleEntities[id!]).toBeUndefined()
  })
})
