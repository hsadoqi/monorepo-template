"use client"

import { createStoreHook } from "@repo/services-zustand/react"

import type { PanelState } from "./store"

import { usePanelStoreApi } from "./panel-store-context"

export const usePanelStore = createStoreHook<PanelState>(usePanelStoreApi)
