"use client"

import { useRef, type ReactNode } from "react"
import type { StoreApi } from "zustand/vanilla"

import { createPanelStore, type PanelState } from "./store"
import { PanelStoreContextProvider } from "./panel-store-context"

const PANEL_STORE_VERSION = 3

export interface PanelProviderProps {
  children: ReactNode
}

export function PanelProvider({ children }: PanelProviderProps) {
  const storeRef = useRef<StoreApi<PanelState> | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createPanelStore(PANEL_STORE_VERSION)
  }

  return (
    <PanelStoreContextProvider value={storeRef.current}>
      {children}
    </PanelStoreContextProvider>
  )
}
