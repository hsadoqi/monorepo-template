import { Folder02Icon } from "@hugeicons/core-free-icons"
import type { PanelModule } from "@repo/domain-panel/modules"
import { FilesModule } from "./files-module"

export const filesPanelModule: PanelModule = {
  id: "files",
  label: "Files",
  icon: Folder02Icon,
  Content: FilesModule,
}
