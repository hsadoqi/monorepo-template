import { PanelTopOpenIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePanelStore } from "@repo/runtime-panel";
import { IconButton } from "@repo/ui-components";

export const PanelTrigger = () => {
  const toggleOpen = usePanelStore(s => s.toggleOpen)
  const isOpen = usePanelStore(s => s.isOpen)

  return (
    <IconButton
      label={isOpen ? "Close Panel" : "Open Panel"}
      onClick={() => toggleOpen()}
      size="icon-sm"
      variant={"outline"}
      tooltipSide="bottom"
    >
      <HugeiconsIcon icon={PanelTopOpenIcon} />
    </IconButton>
  )
}
