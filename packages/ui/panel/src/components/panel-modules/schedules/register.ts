import { Calendar03Icon } from "@hugeicons/core-free-icons"
import { registerPanelModule } from "@repo/runtime-panel"
import { SchedulesModule } from "./schedules-module"

registerPanelModule({
  id: "schedules",
  label: "Schedules",
  icon: Calendar03Icon,
  Content: SchedulesModule,
})
