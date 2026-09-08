import { beforeAll, describe, expect, it, vi } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
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
        isLocked={false}
        onToggleLock={() => {}}
        onToggleModuleVisibility={() => {}}
        onReorderModule={() => {}}
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
        isLocked={false}
        onToggleLock={() => {}}
        onToggleModuleVisibility={() => {}}
        onReorderModule={() => {}}
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
        isLocked={false}
        onToggleLock={() => {}}
        onToggleModuleVisibility={() => {}}
        onReorderModule={() => {}}
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
        isLocked={false}
        onToggleLock={() => {}}
        onToggleModuleVisibility={() => {}}
        onReorderModule={() => {}}
        onOpenChange={() => {}}
      />
    )

    expect(screen.getAllByRole("separator")).toHaveLength(1)
  })

  it("shows a lock toggle and calls onToggleLock when pressed", () => {
    const onToggleLock = vi.fn()
    renderUi(
      <UtilityPanel
        isOpen
        modules={[notesModule]}
        activeModuleIds={["notes"]}
        paneSizes={{}}
        onPaneSizesChange={() => {}}
        isLocked={false}
        onToggleLock={onToggleLock}
        onToggleModuleVisibility={() => {}}
        onReorderModule={() => {}}
        onOpenChange={() => {}}
      />
    )
    fireEvent.click(screen.getByRole("button", { name: /lock panel/i }))
    expect(onToggleLock).toHaveBeenCalledTimes(1)
  })

  it("does not close on outside click or Escape when locked", () => {
    const onOpenChange = vi.fn()
    renderUi(
      <>
        <UtilityPanel
          isOpen
          modules={[notesModule]}
          activeModuleIds={["notes"]}
          paneSizes={{}}
          onPaneSizesChange={() => {}}
          isLocked
          onToggleLock={() => {}}
          onToggleModuleVisibility={() => {}}
          onReorderModule={() => {}}
          onOpenChange={onOpenChange}
        />
        <button data-testid="outside-app">outside</button>
      </>
    )
    fireEvent.mouseDown(screen.getByTestId("outside-app"))
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it("lets the user hide a module and reorder the remaining ones via the manage-modules popover", () => {
    const onToggleModuleVisibility = vi.fn()
    const onReorderModule = vi.fn()
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
        isLocked={false}
        onToggleLock={() => {}}
        onToggleModuleVisibility={onToggleModuleVisibility}
        onReorderModule={onReorderModule}
        onOpenChange={() => {}}
      />
    )
    fireEvent.click(screen.getByRole("button", { name: /manage modules/i }))
    fireEvent.click(screen.getByRole("checkbox", { name: "Schedule" }))
    expect(onToggleModuleVisibility).toHaveBeenCalledWith("schedule")

    fireEvent.click(screen.getByRole("button", { name: /move schedule up/i }))
    expect(onReorderModule).toHaveBeenCalledWith("schedule", "up")
  })

  it("shows an empty-state message when no modules are active", () => {
    renderUi(
      <UtilityPanel
        isOpen
        modules={[notesModule]}
        activeModuleIds={[]}
        paneSizes={{}}
        onPaneSizesChange={() => {}}
        isLocked={false}
        onToggleLock={() => {}}
        onToggleModuleVisibility={() => {}}
        onReorderModule={() => {}}
        onOpenChange={() => {}}
      />
    )
    expect(screen.getByText(/no modules are shown/i)).toBeInTheDocument()
  })
})
