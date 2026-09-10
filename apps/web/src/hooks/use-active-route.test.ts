import { describe, expect, it } from "vitest"

import type { NavItem } from "@/lib/data/navigation"

import { isActiveRoute, resolvePageTitle } from "./use-active-route"

const navItems: NavItem[] = [
  { label: "Overview", href: "/", icon: {} as never },
  { label: "Theme system", href: "/theme", icon: {} as never },
]

describe("isActiveRoute", () => {
  it("matches an exact route", () => {
    expect(isActiveRoute("/theme", "/theme")).toBe(true)
  })

  it("matches the root route", () => {
    expect(isActiveRoute("/", "/")).toBe(true)
  })

  it("ignores a trailing slash on either side", () => {
    expect(isActiveRoute("/theme/", "/theme")).toBe(true)
    expect(isActiveRoute("/theme", "/theme/")).toBe(true)
  })

  it("does not match a different route", () => {
    expect(isActiveRoute("/theme", "/settings")).toBe(false)
  })

  it("does not match a nested route as its parent", () => {
    expect(isActiveRoute("/theme", "/theme/colors")).toBe(false)
  })
})

describe("resolvePageTitle", () => {
  it("uses the nav config label for an exact match", () => {
    expect(resolvePageTitle("/theme", navItems)).toBe("Theme system")
  })

  it("falls back to Overview for the root path", () => {
    expect(resolvePageTitle("/", navItems)).toBe("Overview")
  })

  it("humanizes an unregistered kebab-case segment", () => {
    expect(resolvePageTitle("/playground", navItems)).toBe("Playground")
    expect(resolvePageTitle("/quick-capture", navItems)).toBe("Quick Capture")
  })

  it("ignores a trailing slash", () => {
    expect(resolvePageTitle("/theme/", navItems)).toBe("Theme system")
  })

  it("humanizes the last segment of a nested unregistered route", () => {
    expect(resolvePageTitle("/settings/notifications", navItems)).toBe("Notifications")
  })
})
