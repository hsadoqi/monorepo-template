import { Clock01Icon } from "@hugeicons/core-free-icons"
import { registerPanelModule } from "@repo/runtime-panel"
import { FocusModule } from "./focus-module"

registerPanelModule({
  id: "focus",
  label: "Focus",
  icon: Clock01Icon,
  Content: FocusModule,
})
