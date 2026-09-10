import type { PanelModule } from "@repo/domain-panel/modules"

let modules: PanelModule[] = []

export function registerPanelModule(module: PanelModule): void {
  if (modules.some((existing) => existing.id === module.id)) return
  modules = [...modules, module]
}

export function getPanelModules(): readonly PanelModule[] {
  return modules
}

/** Test-only: clears the registry between test files. Not exported from the package barrel. */
export function __resetPanelRegistryForTests(): void {
  modules = []
}
