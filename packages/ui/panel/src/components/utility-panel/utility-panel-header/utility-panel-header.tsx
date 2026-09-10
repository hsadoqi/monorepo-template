"use client"

import type { PanelModule } from "@repo/domain-panel/modules"
import { UtilityBreadcrumbs } from "./utility-panel-breadcrumbs"
import { UtilityPanelActions } from "./utility-panel-actions"

export const UtilityPanelHeader = ({ modules }: { modules: PanelModule[] }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 py-2 flex-1 justify-between">
        <UtilityBreadcrumbs modules={modules} />
        <UtilityPanelActions modules={modules} />
      </div>
    </header>
  )
}
