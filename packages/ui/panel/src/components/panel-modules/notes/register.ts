import { InboxIcon } from "@hugeicons/core-free-icons"
import type { PanelModule } from "@repo/domain-panel/modules"
import { NotesModule } from "./notes-module"

export const notesPanelModule: PanelModule = {
  id: "notes",
  label: "Notes",
  icon: InboxIcon,
  Content: NotesModule,
}
