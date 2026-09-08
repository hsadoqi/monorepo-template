/**
 * `@repo/runtime-panel` — React state, the module contract, and the module
 * registry for the global panel system.
 *
 * Layering: consumes `@repo/domain-panel` for pure schemas/types; owns
 * everything that touches React or zustand. See `.docs/architecture-boundaries.md`.
 */
export type { PanelModule } from "@repo/ui-components/components/panel"
export * from "./registry"
export * from "./store"
export * from "./modules-store"
export * from "./notes/notes-slice"
export * from "./focus/focus-slice"
export * from "./files/files-slice"
