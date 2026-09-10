"use client"

import {
  SquareLock02Icon,
  SquareUnlock02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { PanelModule } from "@repo/domain-panel/modules"
import { Toggle } from "@repo/ui-components/base/toggle"
import { useGlobalPanel } from "@repo/runtime-panel/use-global-panel"
import { UtilityPanelModulePopover } from "./utility-panel-module-popover"

export const UtilityPanelActions = ({
  modules,
}: {
  modules: PanelModule[]
}) => {
  const {
    uiState: { isLocked, toggleLock },
  } = useGlobalPanel()

  return (
    <div className="flex items-center justify-end gap-1">
      <UtilityPanelModulePopover modules={modules} />
      <Toggle
        pressed={isLocked}
        onPressedChange={toggleLock}
        size="sm"
        aria-label="Lock panel"
      >
        <HugeiconsIcon
          icon={isLocked ? SquareLock02Icon : SquareUnlock02Icon}
        />
      </Toggle>
    </div>
  )
}
