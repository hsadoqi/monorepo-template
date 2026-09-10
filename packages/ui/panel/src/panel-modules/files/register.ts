import { Folder02Icon } from "@hugeicons/core-free-icons"
import { registerPanelModule } from "@repo/runtime-panel"
import { FilesModule } from "./files-module"

registerPanelModule({
  id: "files",
  label: "Files",
  icon: Folder02Icon,
  Content: FilesModule,
})
