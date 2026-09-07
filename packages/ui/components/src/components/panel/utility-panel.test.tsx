import { describe, expect, it } from "vitest"
import { screen } from "@testing-library/react"
import { renderUi } from "@repo/foundation-vitest-utils/react"
import { UtilityPanel } from "./utility-panel"
import type { PanelModule } from "./panel-module"
import { InboxIcon } from "@hugeicons/core-free-icons"

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
        isOpen
        modules={[notesModule]}
        activeModuleIds={["notes"]}
        onOpenChange={() => {}}
      />
    )
    expect(screen.getByText("Notes content")).toBeInTheDocument()
  })

  it("sets data-open=false and hides content from the accessibility tree when closed", () => {
    renderUi(
      <UtilityPanel
        isOpen={false}
        modules={[notesModule]}
        activeModuleIds={["notes"]}
        onOpenChange={() => {}}
      />
    )
    const root = screen.getByTestId("utility-panel-root")
    expect(root).toHaveAttribute("data-open", "false")
    expect(screen.queryByText("Notes content")).not.toBeVisible()
  })
})
