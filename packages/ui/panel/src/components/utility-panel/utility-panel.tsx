"use client"

import * as React from "react"
import { useRef } from "react"
import { cn } from "@repo/ui-components/lib/utils"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@repo/ui-components/base/resizable"
import { usePanelDismiss } from "../../hooks/use-panel-dismiss"
import { PanelModule } from "@repo/domain-panel/modules"
import { UtilityPanelHeader } from "./utility-panel-header"

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
          <UtilityPanelHeader
            isLocked={isLocked}
            onToggleLock={onToggleLock}
            onOpenChange={onOpenChange}
            onReorderModule={onReorderModule}
            onToggleModuleVisibility={onToggleModuleVisibility}
            modules={modules}
            activeModuleIds={activeModuleIds}
          />
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
