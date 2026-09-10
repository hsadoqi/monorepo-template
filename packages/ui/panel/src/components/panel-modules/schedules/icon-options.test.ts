import { describe, expect, it } from "vitest"
import { SCHEDULE_ICON_OPTIONS, resolveScheduleIcon } from "./icon-options"

describe("SCHEDULE_ICON_OPTIONS", () => {
  it("has unique, non-empty icon names", () => {
    const names = SCHEDULE_ICON_OPTIONS.map((option) => option.name)
    expect(names.length).toBeGreaterThan(0)
    expect(new Set(names).size).toBe(names.length)
  })
})

describe("resolveScheduleIcon", () => {
  it("returns the matching icon for a known key", () => {
    const [first] = SCHEDULE_ICON_OPTIONS
    expect(resolveScheduleIcon(first!.name)).toBe(first!.icon)
  })

  it("falls back to a default icon for an unknown key", () => {
    expect(resolveScheduleIcon("NotARealIcon")).toBe(
      resolveScheduleIcon(undefined)
    )
  })

  it("falls back to a default icon when no key is given", () => {
    expect(resolveScheduleIcon(undefined)).toBeDefined()
  })
})
