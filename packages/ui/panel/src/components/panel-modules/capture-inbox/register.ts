import type { PanelModule } from "@repo/domain-panel/modules"
import { CaptureInboxModule } from "./capture-inbox-module"
import { InboxIcon } from "@hugeicons/core-free-icons"

export const captureInboxPanelModule: PanelModule = {
  id: "capture-inbox",
  label: "Capture Inbox",
  icon: InboxIcon,
  Content: CaptureInboxModule,
}
