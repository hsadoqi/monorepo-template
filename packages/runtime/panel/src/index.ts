/**
 * `@repo/runtime-panel` — React state, the module contract, and the module
 * registry for the global panel system.
 *
 * Layering: consumes `@repo/domain-panel` for pure schemas/types; owns
 * everything that touches React or zustand. See `.docs/architecture-boundaries.md`.
 */
export * from "./store/registry"
export * from "./store/store"
export * from "./panel-modules/panel-modules-store.schema"
export * from "./panel-modules/panel-modules-store"
export * from "./use-global-panel"
export * from "./panel-modules/slices/files"
export * from "./panel-modules/slices/notes"
export * from "./panel-modules/slices/focus"
export * from "./panel-modules/slices/schedules"
export * from "./panel-modules/slices/capture-inbox"
export * from "@repo/domain-panel"
