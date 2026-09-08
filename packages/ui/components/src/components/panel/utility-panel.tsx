"use client"

import * as React from "react"
import { useRef } from "react"
import { cn } from "@repo/ui-components/lib/utils"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@repo/ui-components/base/resizable"
import { Toggle } from "@repo/ui-components/base/toggle"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@repo/ui-components/base/popover"
import { Checkbox } from "@repo/ui-components/base/checkbox"
import { Button } from "@repo/ui-components/base/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  SquareLock02Icon,
  SquareUnlock02Icon,
  Settings02Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons"
import type { PanelModule } from "./panel-module"
import { usePanelDismiss } from "./use-panel-dismiss"

export interface UtilityPanelProps {
  isOpen: boolean
  modules: PanelModule[]
  activeModuleIds: string[]
  paneSizes: Record<string, number>
  onPaneSizesChange: (sizes: Record<string, number>) => void
  isLocked: boolean
  onToggleLock: () => void
  onToggleModuleVisibility: (id: string) => void
  onReorderModule: (id: string, direction: "up" | "down") => void
  onOpenChange: (open: boolean) => void
  className?: string
}

export function UtilityPanel({
  isOpen,
  modules,
  activeModuleIds,
  paneSizes,
  onPaneSizesChange,
  isLocked,
  onToggleLock,
  onToggleModuleVisibility,
  onReorderModule,
  onOpenChange,
  className,
}: UtilityPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  usePanelDismiss({
    enabled: isOpen && !isLocked,
    onDismiss: () => onOpenChange(false),
    panelRef,
  })

  const visibleModules = activeModuleIds
    .map((id) => modules.find((module) => module.id === id))
    .filter((module): module is PanelModule => module !== undefined)

  return (
    <div
      ref={panelRef}
      data-slot="utility-panel-root"
      data-testid="utility-panel-root"
      data-open={isOpen}
      className={cn(
        "grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out motion-reduce:transition-none data-[open=true]:grid-rows-[1fr]",
        className
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className="border-border bg-background border-b"
          aria-hidden={!isOpen}
          inert={!isOpen}
        >
          <div className="flex items-center justify-end gap-1 px-2 pt-2">
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
          {visibleModules.length === 0 ? (
            <p className="text-muted-foreground p-4 text-sm">
              No modules are shown. Open &quot;Manage modules&quot; to add one.
            </p>
          ) : (
            <ResizablePanelGroup
              orientation="horizontal"
              onLayoutChanged={(layout, meta) => {
                if (meta.isUserInteraction) {
                  onPaneSizesChange(layout)
                }
              }}
            >
              {visibleModules.map((module, index) => (
                <React.Fragment key={module.id}>
                  {index > 0 && <ResizableHandle withHandle />}
                  <ResizablePanel
                    id={module.id}
                    defaultSize={String(
                      paneSizes[module.id] ?? 100 / visibleModules.length
                    )}
                    minSize="15"
                  >
                    <div className="h-full min-w-0 p-4">
                      <module.Content />
                    </div>
                  </ResizablePanel>
                </React.Fragment>
              ))}
            </ResizablePanelGroup>
          )}
        </div>
      </div>
    </div>
  )
}
