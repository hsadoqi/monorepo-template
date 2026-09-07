import { fireEvent, render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { createMatchMediaMock } from "@repo/foundation-test-mocks/browser"
import { SidebarProvider } from "@repo/ui-components/base/sidebar"

import { AppContentHeader } from "./app-content-header"

const { matchMedia } = createMatchMediaMock(false)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: matchMedia,
})

vi.mock("@repo/ui-theme", () => ({
  ThemeForm: () => <div>Theme form</div>,
}))

vi.mock("@/components/appearance-toggle", () => ({
  AppearanceToggle: () => <button type="button">Toggle appearance</button>,
}))

describe("AppContentHeader", () => {
  it("keeps the theme sheet header fixed while its body scrolls", () => {
    const { getByRole } = render(
      <SidebarProvider>
        <AppContentHeader />
      </SidebarProvider>
    )

    fireEvent.click(getByRole("button", { name: "Configure" }))

    const sheet = document.querySelector('[data-slot="sheet-content"]')
    const header = document.querySelector('[data-slot="sheet-header"]')
    const body = document.querySelector('[data-slot="theme-sheet-body"]')

    expect(sheet?.className.split(" ")).toEqual(
      expect.arrayContaining(["overflow-hidden"])
    )
    expect(header?.className.split(" ")).toEqual(
      expect.arrayContaining(["shrink-0"])
    )
    expect(body?.className.split(" ")).toEqual(
      expect.arrayContaining(["min-h-0", "flex-1", "overflow-y-auto"])
    )
  })
})
