import { InboxIcon } from "@hugeicons/core-free-icons"
import type { PanelModule } from "@repo/domain-panel/modules"
import { renderUi } from "@repo/foundation-vitest-utils/react"
import { SidebarProvider } from "@repo/ui-components/base/sidebar"
import { fireEvent, screen } from "@testing-library/react"
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest"
import { UtilityPanelSidebar } from "./utility-panel-sidebar"

const { setActiveModuleId } = vi.hoisted(() => ({
  setActiveModuleId: vi.fn(),
}))

vi.mock("@repo/runtime-panel/use-global-panel", () => ({
  useGlobalPanel: () => ({
    modules: {
      activeModuleId: "notes",
      setActiveModuleId,
    },
  }),
}))

const modules: PanelModule[] = [
  {
    id: "notes",
    label: "Notes",
    icon: InboxIcon,
    Content: () => null,
  },
  {
    id: "files",
    label: "Files",
    icon: InboxIcon,
    Content: () => null,
  },
]

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
    writable: true,
  })
})

describe("UtilityPanelSidebar", () => {
  beforeEach(() => {
    setActiveModuleId.mockClear()
  })

  it("visually and semantically marks the active module", () => {
    renderUi(
      <SidebarProvider>
        <UtilityPanelSidebar modules={modules} />
      </SidebarProvider>
    )

    const notesButton = screen.getByRole("button", { name: "Notes" })
    const filesButton = screen.getByRole("button", { name: "Files" })

    expect(notesButton).toHaveAttribute("data-active")
    expect(notesButton).toHaveAttribute("aria-current", "true")
    expect(notesButton).toHaveClass("aria-current:bg-primary/10")
    expect(filesButton).not.toHaveAttribute("data-active")
    expect(filesButton).not.toHaveAttribute("aria-current")
  })

  it("selects a module from the sidebar", () => {
    renderUi(
      <SidebarProvider>
        <UtilityPanelSidebar modules={modules} />
      </SidebarProvider>
    )

    fireEvent.click(screen.getByRole("button", { name: "Files" }))

    expect(setActiveModuleId).toHaveBeenCalledWith("files")
  })
})
