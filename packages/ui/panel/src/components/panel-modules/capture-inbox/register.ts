import { registerPanelModule } from "@repo/runtime-panel"
import { CaptureInboxModule } from "./capture-inbox-module"
import { InboxIcon } from "@hugeicons/core-free-icons"

registerPanelModule({
  id: "capture-inbox",
  label: "Capture Inbox",
  icon: InboxIcon,
  Content: CaptureInboxModule,
})
