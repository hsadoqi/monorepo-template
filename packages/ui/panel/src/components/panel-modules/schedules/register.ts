import { Calendar03Icon } from "@hugeicons/core-free-icons"
import type { PanelModule } from "@repo/domain-panel/modules"
import { SchedulesModule } from "./schedules-module"

export const schedulesPanelModule: PanelModule = {
  id: "schedules",
  label: "Schedules",
  icon: Calendar03Icon,
  Content: SchedulesModule,
}
