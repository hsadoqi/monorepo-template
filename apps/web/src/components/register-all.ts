/**
 * Side-effect-only import: each of these calls `registerPanelModule()` at
 * module scope. Importing this file (once, from `GlobalPanel`) is what
 * populates the panel registry — the modules themselves never import each
 * other.
 */
import "@repo/ui-panel/notes/register"
import "@repo/ui-panel/schedule/register"
import "@repo/ui-panel/focus/register"
import "@repo/ui-panel/files/register"
