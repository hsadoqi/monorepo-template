import { Clock01Icon } from "@hugeicons/core-free-icons"
import type { PanelModule } from "@repo/domain-panel/modules"
import { FocusModule } from "./focus-module"

export const focusPanelModule: PanelModule = {
  id: "focus",
  label: "Focus",
  icon: Clock01Icon,
  Content: FocusModule,
}
