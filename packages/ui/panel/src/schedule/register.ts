import { Calendar03Icon } from "@hugeicons/core-free-icons"
import { registerPanelModule } from "@repo/runtime-panel"
import { ScheduleModule } from "./schedule-module"

registerPanelModule({
  id: "schedule",
  label: "Schedule",
  icon: Calendar03Icon,
  Content: ScheduleModule,
})
