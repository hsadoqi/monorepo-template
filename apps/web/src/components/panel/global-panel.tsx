"use client"

import "@repo/ui-panel/register-all"
import { UtilityPanel } from "@repo/ui-panel/utility-panel"
import { useGlobalPanel } from "@repo/runtime-panel"

export function GlobalPanel() {
  const {
    uiState: { isOpen, isLocked, toggleLock, panelSizes, setPanelSizes },
    modules: {
      activeModules,
      activeIds,
      reorderModule,
      toggleModuleVisibility,
    },
  } = useGlobalPanel()
  return (
    <UtilityPanel
      isOpen={isOpen}
      modules={[...activeModules]}
      activeModuleIds={activeIds}
      paneSizes={panelSizes}
      onPaneSizesChange={setPanelSizes}
      isLocked={isLocked}
      onToggleLock={toggleLock}
      onToggleModuleVisibility={toggleModuleVisibility}
      onReorderModule={reorderModule}
      onOpenChange={(open) => {
        if (!open) close()
      }}
    />
  )
}
