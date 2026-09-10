"use client"

import { useRehydrateStore } from "@repo/services-zustand"
import { getPanelModules } from "./store/registry"
import { panelStore, usePanelStore } from "./store/store"
import { modulesStore } from "./panel-modules/panel-modules-store"

export const useGlobalPanel = () => {
  useRehydrateStore(panelStore)
  useRehydrateStore(modulesStore)

  const isOpen = usePanelStore((state) => state.isOpen)
  const isLocked = usePanelStore((state) => state.isLocked)
  const activeModuleIds = usePanelStore((state) => state.activeModuleIds)
  const panelSizes = usePanelStore((state) => state.panelSizes)
  const close = usePanelStore((state) => state.close)
  const open = usePanelStore((s) => s.open)
  const toggleLock = usePanelStore((state) => state.toggleLock)
  const setPanelSizes = usePanelStore((state) => state.setPanelSizes)
  const toggleModuleVisibility = usePanelStore(
    (state) => state.toggleModuleVisibility
  )
  const reorderModule = usePanelStore((state) => state.reorderModule)
  const toggleOpen = usePanelStore((s) => s.toggleOpen)
  const activeModules = getPanelModules()

  return {
    uiState: {
      isOpen,
      isLocked,
      toggleOpen,
      toggleLock,
      open,
      close,
      panelSizes,
      setPanelSizes,
    },
    modules: {
      activeIds: activeModuleIds,
      activeModules,
      reorderModule,
      toggleModuleVisibility,
    },
  }
}
