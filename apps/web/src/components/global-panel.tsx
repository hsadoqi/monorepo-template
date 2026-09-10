"use client"

import { PANEL_MODULES } from "@repo/ui-panel/register-all"
import { UtilityPanel } from "@repo/ui-panel/utility-panel"

export function GlobalPanel() {
  return <UtilityPanel modules={[...PANEL_MODULES]} />
}
