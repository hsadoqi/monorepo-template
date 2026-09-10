import { render, type RenderResult } from "@testing-library/react"
import type { ReactElement } from "react"

import {
  ModulesStoreContextProvider,
  createModulesStore,
  type ModulesStoreApi,
} from "@repo/runtime-panel"

/**
 * Renders a panel module under a fresh (or caller-provided) ModulesStore
 * instance, matching the runtime's provider-scoped store pattern instead of
 * the removed module-level singleton.
 */
export function renderWithModulesStore(
  ui: ReactElement,
  modulesStore: ModulesStoreApi = createModulesStore(1)
): RenderResult & { modulesStore: ModulesStoreApi } {
  const result = render(
    <ModulesStoreContextProvider value={modulesStore}>
      {ui}
    </ModulesStoreContextProvider>
  )
  return { ...result, modulesStore }
}
