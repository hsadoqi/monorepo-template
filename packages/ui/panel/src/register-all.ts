/**
 * Side-effect-only import: each of these calls `registerPanelModule()` at
 * module scope. Importing this file (once, from `GlobalPanel`) is what
 * populates the panel registry — the modules themselves never import each
 * other.
 */
import "./components/panel-modules/capture-inbox/register"
import "./components/panel-modules/files/register"
import "./components/panel-modules/focus/register"
import "./components/panel-modules/notes/register"
import "./components/panel-modules/schedules/register"
