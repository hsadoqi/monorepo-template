import { describe, expect, it } from "vitest"
import { PANEL_MODULES } from "./register-all"

describe("PANEL_MODULES", () => {
  it("includes overview ahead of the modules its presets create data for", () => {
    expect(PANEL_MODULES.map((module) => module.id)).toEqual([
      "overview",
      "notes",
      "files",
      "schedules",
      "focus",
      "capture-inbox",
    ])
  })
})
