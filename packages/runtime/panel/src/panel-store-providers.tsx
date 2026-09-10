"use client"

import type { ReactNode } from "react"

import { PanelProvider } from "./store/panel-provider"
import { ModulesProvider } from "./panel-modules/modules-provider"

export interface PanelStoreProvidersProps {
  children: ReactNode
}

/** Composes the panel-shell and module-content store providers for the app root. */
export function PanelStoreProviders({ children }: PanelStoreProvidersProps) {
  return (
    <PanelProvider>
      <ModulesProvider>{children}</ModulesProvider>
    </PanelProvider>
  )
}
