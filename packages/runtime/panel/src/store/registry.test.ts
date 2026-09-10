import { beforeEach, describe, expect, it } from "vitest"
import {
  registerPanelModule,
  getPanelModules,
  __resetPanelRegistryForTests,
} from "./registry"
import { InboxIcon } from "@hugeicons/core-free-icons"

beforeEach(() => {
  __resetPanelRegistryForTests()
})

describe("panel registry", () => {
  it("returns registered modules in registration order", () => {
    registerPanelModule({
      id: "a",
      label: "A",
      icon: InboxIcon,
      Content: () => null,
    })
    registerPanelModule({
      id: "b",
      label: "B",
      icon: InboxIcon,
      Content: () => null,
    })
    expect(getPanelModules().map((module) => module.id)).toEqual(["a", "b"])
  })

  it("does not register the same id twice", () => {
    registerPanelModule({
      id: "a",
      label: "A",
      icon: InboxIcon,
      Content: () => null,
    })
    registerPanelModule({
      id: "a",
      label: "A again",
      icon: InboxIcon,
      Content: () => null,
    })
    expect(getPanelModules()).toHaveLength(1)
  })
})
