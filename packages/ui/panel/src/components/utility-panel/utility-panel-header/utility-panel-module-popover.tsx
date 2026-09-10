"use client"

import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Checkbox } from "@repo/ui-components/base/checkbox"
import { Button } from "@repo/ui-components/base/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui-components/base/popover"
import type { PanelModule } from "@repo/domain-panel/modules"
import { useGlobalPanel } from "@repo/runtime-panel/use-global-panel"

export const UtilityPanelModulePopover = ({
  modules,
}: {
  modules: PanelModule[]
}) => {
  const {
    modules: { moduleIds, toggleModuleVisibility, reorderModule },
  } = useGlobalPanel()
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Manage modules" />
        }
      >
        <HugeiconsIcon icon={Settings02Icon} />
      </PopoverTrigger>
      <PopoverContent>
        <ul className="flex flex-col gap-2">
          {modules.map((module) => {
            const isVisible = moduleIds.includes(module.id)
            const visibleIndex = moduleIds.indexOf(module.id)
            return (
              <li key={module.id} className="flex items-center gap-2">
                <Checkbox
                  checked={isVisible}
                  onCheckedChange={() => toggleModuleVisibility(module.id)}
                  aria-label={module.label}
                />
                <span className="flex-1 text-sm">{module.label}</span>
                {isVisible && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Move ${module.label} up`}
                      disabled={visibleIndex <= 0}
                      onClick={() => reorderModule(module.id, "up")}
                    >
                      <HugeiconsIcon icon={ArrowUp01Icon} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Move ${module.label} down`}
                      disabled={visibleIndex >= moduleIds.length - 1}
                      onClick={() => reorderModule(module.id, "down")}
                    >
                      <HugeiconsIcon icon={ArrowDown01Icon} />
                    </Button>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
