import type { PanelModule } from "@repo/domain-panel/modules"
import { notesPanelModule } from "./components/panel-modules/notes/register"
import { filesPanelModule } from "./components/panel-modules/files/register"
import { schedulesPanelModule } from "./components/panel-modules/schedules/register"
import { focusPanelModule } from "./components/panel-modules/focus/register"
import { captureInboxPanelModule } from "./components/panel-modules/capture-inbox/register"
import { overviewPanelModule } from "./components/panel-modules/overview/register"

/**
 * The panel's module list, as a plain exported array rather than state
 * populated via import side effects. A module-scope mutable registry
 * populated by side-effect imports can silently reset to empty under
 * Fast Refresh (the registering files don't necessarily re-run when only
 * this file's dependency graph changes) — a plain array recomputes
 * correctly on every hot update of this file instead.
 */
export const PANEL_MODULES: readonly PanelModule[] = [
  overviewPanelModule,
  notesPanelModule,
  filesPanelModule,
  schedulesPanelModule,
  focusPanelModule,
  captureInboxPanelModule,
]
