"use client"

import { SidebarProvider } from "@repo/ui-components/base/sidebar"
import { UtilityPanelHeader } from "./utility-panel-header"
import type { PanelModule } from "@repo/domain-panel/modules"
import { UtilityPanelSidebar } from "./utility-panel-sidebar"

export const UtilityPanelLayout = ({
  modules,
  children,
}: {
  modules: PanelModule[]
  children: React.ReactNode
}) => {
  return (
    <SidebarProvider className="relative h-full min-h-0 items-start">
      <UtilityPanelSidebar modules={modules} />
      <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        <UtilityPanelHeader modules={modules} />
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
