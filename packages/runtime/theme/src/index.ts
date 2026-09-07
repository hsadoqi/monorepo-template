// Re-exports for backward compatibility
export { resolveAppearance } from "./resolution/resolve-appearance"
export * from "./runtime"
export * from "./store"
export * from "./scope"
export * from "./registry"
export * from "./ports"

// Compiler pipeline (Phase 2 — now implemented)
export { compile } from "@repo/domain-theme/compiler"
export type {
  ThemeCompilationInput,
  ThemeCompilationResult,
  ResolvedTheme,
  CssVariables,
} from "@repo/domain-theme/compiler"
