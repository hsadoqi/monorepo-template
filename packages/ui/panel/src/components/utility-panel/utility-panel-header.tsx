import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Settings02Icon,
  SquareLock02Icon,
  SquareUnlock02Icon,
} from "@hugeicons/core-free-icons"
import { Checkbox } from "@repo/ui-components/base/checkbox"
import { HugeiconsIcon } from "@hugeicons/react"
import { PanelModule } from "@repo/domain-panel"
import { Button } from "@repo/ui-components/base/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui-components/base/popover"
import { Toggle } from "@repo/ui-components/base/toggle"

export const UtilityPanelHeader = ({
  isLocked,
  onToggleLock,
  onOpenChange: _onOpenChange,
  onReorderModule,
  onToggleModuleVisibility,
  modules,
  activeModuleIds,
}: {
  isLocked: boolean
  onToggleLock: () => void
  onOpenChange: (open: boolean) => void
  onReorderModule: (id: string, direction: "up" | "down") => void
  onToggleModuleVisibility: (id: string) => void
  modules: PanelModule[]
  activeModuleIds: string[]
}) => {
  return (
    <div className="flex items-center justify-between gap-2 px-2 py-1">
      <div className="flex items-center justify-end gap-1 px-2 pt-2">
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Manage modules"
              />
            }
          >
            <HugeiconsIcon icon={Settings02Icon} />
          </PopoverTrigger>
          <PopoverContent>
            <ul className="flex flex-col gap-2">
              {modules.map((module) => {
                const isVisible = activeModuleIds.includes(module.id)
                const visibleIndex = activeModuleIds.indexOf(module.id)
                return (
                  <li key={module.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={isVisible}
                      onCheckedChange={() =>
                        onToggleModuleVisibility(module.id)
                      }
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
                          onClick={() => onReorderModule(module.id, "up")}
                        >
                          <HugeiconsIcon icon={ArrowUp01Icon} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Move ${module.label} down`}
                          disabled={visibleIndex >= activeModuleIds.length - 1}
                          onClick={() => onReorderModule(module.id, "down")}
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
        <Toggle
          pressed={isLocked}
          onPressedChange={onToggleLock}
          size="sm"
          aria-label="Lock panel"
        >
          <HugeiconsIcon
            icon={isLocked ? SquareLock02Icon : SquareUnlock02Icon}
          />
        </Toggle>
      </div>
    </div>
  )
}
