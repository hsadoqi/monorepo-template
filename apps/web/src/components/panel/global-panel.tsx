// apps/web/src/components/panel/global-panel.tsx
"use client"

import "../register-all"
import { useRehydrateStore } from "@repo/services-zustand/react"
import { UtilityPanel } from "@repo/ui-components/components/panel"
import { getPanelModules } from "@repo/runtime-panel/registry"
import { modulesStore } from "@repo/runtime-panel/modules-store"
import { panelStore, usePanelStore } from "@/hooks/use-panel-store"

export function GlobalPanel() {
  useRehydrateStore(panelStore)
  useRehydrateStore(modulesStore)

  const isOpen = usePanelStore((state) => state.isOpen)
  const isLocked = usePanelStore((state) => state.isLocked)
  const activeModuleIds = usePanelStore((state) => state.activeModuleIds)
  const paneSizes = usePanelStore((state) => state.paneSizes)
  const close = usePanelStore((state) => state.close)
  const toggleLock = usePanelStore((state) => state.toggleLock)
  const setPaneSizes = usePanelStore((state) => state.setPaneSizes)
  const toggleModuleVisibility = usePanelStore(
    (state) => state.toggleModuleVisibility
  )
  const reorderModule = usePanelStore((state) => state.reorderModule)

  return (
    <UtilityPanel
      isOpen={isOpen}
      modules={[...getPanelModules()]}
      activeModuleIds={activeModuleIds}
      paneSizes={paneSizes}
      onPaneSizesChange={setPaneSizes}
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
