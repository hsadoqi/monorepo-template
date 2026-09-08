import { registerPanelModule } from "@repo/runtime-panel"
import { createScheduleModule } from "@repo/ui-panel/schedule"
import { UPCOMING_ITEMS } from "@/lib/upcoming-items"

registerPanelModule(createScheduleModule(UPCOMING_ITEMS))
