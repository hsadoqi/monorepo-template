"use client"

import { createStoreContext } from "@repo/services-zustand/react"

import type { ModulesState } from "./panel-modules-store"

const modulesStoreContext = createStoreContext<ModulesState>(
  "ModulesStoreContext"
)

export const ModulesStoreContext = modulesStoreContext.Context
export const ModulesStoreContextProvider = modulesStoreContext.Provider
export const useModulesStoreApi = modulesStoreContext.useStoreApi
