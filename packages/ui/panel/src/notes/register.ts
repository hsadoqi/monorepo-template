import { InboxIcon } from "@hugeicons/core-free-icons"
import { registerPanelModule } from "@repo/runtime-panel"
import { NotesModule } from "./notes-module"

registerPanelModule({
  id: "notes",
  label: "Notes",
  icon: InboxIcon,
  Content: NotesModule,
})
