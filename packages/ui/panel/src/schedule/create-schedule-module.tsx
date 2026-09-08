import { Calendar03Icon } from "@hugeicons/core-free-icons"
import type { ScheduleItem } from "@repo/domain-panel"
import type { PanelModule } from "@repo/ui-components/components/panel"
import { ScheduleModule } from "./schedule-module"

/** Builds the registerable Schedule PanelModule from the caller's items. */
export function createScheduleModule(items: ScheduleItem[]): PanelModule {
  return {
    id: "schedule",
    label: "Schedule",
    icon: Calendar03Icon,
    Content: () => <ScheduleModule items={items} />,
  }
}
