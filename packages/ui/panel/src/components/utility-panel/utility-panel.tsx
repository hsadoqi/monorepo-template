"use client"

import * as React from "react"
import { useRef } from "react"
import { cn } from "@repo/ui-components/lib/utils"
import { usePanelDismiss } from "../../hooks/use-panel-dismiss"
import type { PanelModule } from "@repo/domain-panel/modules"
import { UtilityPanelLayout } from "./utility-panel-layout"
import { useGlobalPanel } from "@repo/runtime-panel/use-global-panel"

export interface UtilityPanelProps {
  modules: PanelModule[]
  className?: string
}

export function UtilityPanel({ modules, className }: UtilityPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const {
    modules: { moduleIds, activeModuleId },
    uiState: { isOpen, isLocked, close },
  } = useGlobalPanel()

  const visibleModules = moduleIds
    .map((id) => modules.find((module) => module.id === id))
    .filter((module): module is PanelModule => module !== undefined)

  const activeModule = React.useMemo(
    () =>
      visibleModules.find((module) => module.id === activeModuleId) ??
      visibleModules[0],
    [activeModuleId, visibleModules]
  )

  usePanelDismiss({
    enabled: isOpen && !isLocked,
    onDismiss: () => {
      if (isOpen) close()
    },
    panelRef,
  })

  return (
    <div
      ref={panelRef}
      data-slot="utility-panel-root"
      data-testid="utility-panel-root"
      data-open={isOpen}
      className={cn(
        "grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out motion-reduce:transition-none data-[open=true]:grid-rows-[1fr] size-full overflow-hidden",
        className
      )}
    >
      <div className="min-h-0 overflow-hidden size-full">
        <div
          className="border-border bg-background border-b size-full"
          aria-hidden={!isOpen}
          inert={!isOpen}
        >
          <UtilityPanelLayout modules={modules}>
            {activeModule?.Content && (
              <div className="h-full min-w-0 p-4">
                {React.createElement(activeModule.Content)}
              </div>
            )}
          </UtilityPanelLayout>
        </div>
      </div>
    </div>
  )
}
