"use client"

import * as React from "react"
import { cn } from "@repo/ui-components/lib/utils"
import type { PanelModule } from "./panel-module"

export interface UtilityPanelProps {
  isOpen: boolean
  modules: PanelModule[]
  activeModuleIds: string[]
  onOpenChange: (open: boolean) => void
  className?: string
}

export function UtilityPanel({
  isOpen,
  modules,
  activeModuleIds,
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
          className="border-border bg-background flex border-b"
          hidden={!isOpen}
        >
          {visibleModules.map((module) => (
            <div key={module.id} className="min-w-0 flex-1 p-4">
              <module.Content />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
