"use client"

import { useRef, type ReactNode } from "react"
import type { StoreApi } from "zustand/vanilla"

import { createModulesStore, type ModulesState } from "./panel-modules-store"
import { ModulesStoreContextProvider } from "./modules-store-context"

const MODULES_STORE_VERSION = 1

export interface ModulesProviderProps {
  children: ReactNode
}

export function ModulesProvider({ children }: ModulesProviderProps) {
  const storeRef = useRef<StoreApi<ModulesState> | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createModulesStore(MODULES_STORE_VERSION)
  }

  return (
    <ModulesStoreContextProvider value={storeRef.current}>
      {children}
    </ModulesStoreContextProvider>
  )
}
