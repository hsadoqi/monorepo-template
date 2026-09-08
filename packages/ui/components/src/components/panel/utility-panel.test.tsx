import { beforeAll, describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { renderUi } from "@repo/foundation-vitest-utils/react"
import { UtilityPanel } from "./utility-panel"
import type { PanelModule } from "./panel-module"
import { InboxIcon } from "@hugeicons/core-free-icons"

// react-resizable-panels observes element size via ResizeObserver, which
// jsdom does not implement. Stub it so the resizable pane group can mount.
class MockResizeObserver {
  disconnect(): void {}
  observe(): void {}
  unobserve(): void {}
}

beforeAll(() => {
  if (!("ResizeObserver" in globalThis)) {
    Object.defineProperty(globalThis, "ResizeObserver", {
      configurable: true,
      value: MockResizeObserver,
      writable: true,
    })
  }
})

const notesModule: PanelModule = {
  id: "notes",
  label: "Notes",
  icon: InboxIcon,
  Content: () => <div>Notes content</div>,
}

describe("UtilityPanel", () => {
  it("renders module content when open", () => {
    renderUi(
      <UtilityPanel
        data-testid="utility-panel-root"
        isOpen
        modules={[notesModule]}
        activeModuleIds={["notes"]}
        paneSizes={{}}
        onPaneSizesChange={() => {}}
        onOpenChange={() => {}}
      />
    )
    expect(screen.getByTestId("utility-panel-root").textContent).toBe(
      "Notes content"
    )
  })

  it("sets data-open=false and hides content from the accessibility tree when closed", () => {
    renderUi(
      <UtilityPanel
        isOpen={false}
        modules={[notesModule]}
        activeModuleIds={["notes"]}
        paneSizes={{}}
        onPaneSizesChange={() => {}}
        onOpenChange={() => {}}
      />
    )
    const root = screen.getByTestId("utility-panel-root")
    expect(root).toHaveAttribute("data-open", "false")

    // Content wrapper should be aria-hidden and inert when closed
    const contentWrapper = screen
      .getByText("Notes content")
      .closest("div[class*='border-border']")
    expect(contentWrapper).toHaveAttribute("aria-hidden")
    expect(contentWrapper?.getAttribute("aria-hidden")).toBe("true")
    expect(contentWrapper).toHaveAttribute("inert")
  })

  it("renders multiple active modules side by side", () => {
    const scheduleModule: PanelModule = {
      id: "schedule",
      label: "Schedule",
      icon: InboxIcon,
      Content: () => <div>Schedule content</div>,
    }

    renderUi(
      <UtilityPanel
        isOpen
        modules={[notesModule, scheduleModule]}
        activeModuleIds={["notes", "schedule"]}
        paneSizes={{}}
        onPaneSizesChange={() => {}}
        onOpenChange={() => {}}
      />
    )

    expect(screen.getByText("Notes content")).toBeInTheDocument()
    expect(screen.getByText("Schedule content")).toBeInTheDocument()
  })

  it("renders a resize handle between two active modules", () => {
    const scheduleModule: PanelModule = {
      id: "schedule",
      label: "Schedule",
      icon: InboxIcon,
      Content: () => <div>Schedule content</div>,
    }

    renderUi(
      <UtilityPanel
        isOpen
        modules={[notesModule, scheduleModule]}
        activeModuleIds={["notes", "schedule"]}
        paneSizes={{}}
        onPaneSizesChange={() => {}}
        onOpenChange={() => {}}
      />
    )

    expect(screen.getAllByRole("separator")).toHaveLength(1)
  })
})
