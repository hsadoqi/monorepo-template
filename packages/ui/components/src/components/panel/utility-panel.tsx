"use client"

import * as React from "react"
import { cn } from "@repo/ui-components/lib/utils"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@repo/ui-components/base/resizable"
import type { PanelModule } from "./panel-module"

export interface UtilityPanelProps {
  isOpen: boolean
  modules: PanelModule[]
  activeModuleIds: string[]
  paneSizes: Record<string, number>
  onPaneSizesChange: (sizes: Record<string, number>) => void
  onOpenChange: (open: boolean) => void
  className?: string
}

export function UtilityPanel({
  isOpen,
  modules,
  activeModuleIds,
  paneSizes,
  onPaneSizesChange,
  className,
}: UtilityPanelProps) {
  const visibleModules = activeModuleIds
    .map((id) => modules.find((module) => module.id === id))
    .filter((module): module is PanelModule => module !== undefined)

  return (
    <div
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
        </div>
      </div>
    </div>
  )
}
