import { Settings } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { IconButton } from "@repo/ui-components"

export const SettingsTrigger = () => {
  return (
    <IconButton label="Settings" variant="outline" size="icon-sm">
      <HugeiconsIcon icon={Settings} />
    </IconButton>
  )
}
