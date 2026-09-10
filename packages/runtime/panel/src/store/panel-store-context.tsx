"use client"

import { createStoreContext } from "@repo/services-zustand/react"

import type { PanelState } from "./store"

const panelStoreContext = createStoreContext<PanelState>("PanelStoreContext")

export const PanelStoreContext = panelStoreContext.Context
export const PanelStoreContextProvider = panelStoreContext.Provider
export const usePanelStoreApi = panelStoreContext.useStoreApi
