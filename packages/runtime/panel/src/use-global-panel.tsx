"use client"

import { useRehydrateStore } from "@repo/services-zustand"
import type { PersistedStoreLike } from "@repo/services-zustand/persist"
import { usePanelStore } from "./store/use-panel-store"
import { usePanelStoreApi } from "./store/panel-store-context"
import { useModulesStoreApi } from "./panel-modules/modules-store-context"

export const useGlobalPanel = () => {
  // Context typing carries the plain StoreApi shape; both stores are always
  // created with zustand's persist middleware via createPanelStore/createModulesStore.
  useRehydrateStore(usePanelStoreApi() as unknown as PersistedStoreLike)
  useRehydrateStore(useModulesStoreApi() as unknown as PersistedStoreLike)

  const isOpen = usePanelStore((state) => state.isOpen)
  const isLocked = usePanelStore((state) => state.isLocked)
  const moduleIds = usePanelStore((state) => state.moduleIds)
  const activeModuleId = usePanelStore((state) => state.activeModuleId)
  const panelSizes = usePanelStore((state) => state.panelSizes)
  const close = usePanelStore((state) => state.close)
  const open = usePanelStore((s) => s.open)
  const toggleLock = usePanelStore((state) => state.toggleLock)
  const setPanelSizes = usePanelStore((state) => state.setPanelSizes)
  const setActiveModuleId = usePanelStore((state) => state.setActiveModuleId)
  const toggleModuleVisibility = usePanelStore(
    (state) => state.toggleModuleVisibility
  )
  const reorderModule = usePanelStore((state) => state.reorderModule)
  const toggleOpen = usePanelStore((s) => s.toggleOpen)
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
      moduleIds,
      activeModuleId,
      setActiveModuleId,
      reorderModule,
      toggleModuleVisibility,
    },
  }
}
