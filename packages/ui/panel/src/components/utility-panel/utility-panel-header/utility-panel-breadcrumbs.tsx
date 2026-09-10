"use client"

import { type PanelModule } from "@repo/runtime-panel"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui-components/base/breadcrumb"
import { SidebarTrigger } from "@repo/ui-components/base/sidebar"
import { useGlobalPanel } from "@repo/runtime-panel/use-global-panel"

export const UtilityBreadcrumbs = ({ modules }: { modules: PanelModule[] }) => {
  const {
    modules: { activeModuleId },
  } = useGlobalPanel()
  const activeModule = modules.find((mod) => mod.id === activeModuleId)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <SidebarTrigger />
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{activeModule?.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
