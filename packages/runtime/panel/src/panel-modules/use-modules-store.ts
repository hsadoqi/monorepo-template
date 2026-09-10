"use client"

import { createStoreHook } from "@repo/services-zustand/react"

import type { ModulesState } from "./panel-modules-store"

import { useModulesStoreApi } from "./modules-store-context"

export const useModulesStore = createStoreHook<ModulesState>(useModulesStoreApi)
