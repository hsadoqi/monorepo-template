import { DashboardSquare01Icon } from "@hugeicons/core-free-icons"
import type { PanelModule } from "@repo/domain-panel/modules"
import { OverviewModule } from "./overview-module"

export const overviewPanelModule: PanelModule = {
  id: "overview",
  label: "Overview",
  icon: DashboardSquare01Icon,
  Content: OverviewModule,
}
