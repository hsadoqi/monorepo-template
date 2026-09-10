"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import type { PanelModule } from "@repo/domain-panel/modules"
import { useGlobalPanel } from "@repo/runtime-panel/use-global-panel"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui-components/base/sidebar"

export const UtilityPanelSidebar = ({
  modules,
}: {
  modules: PanelModule[]
}) => {
  const {
    modules: { activeModuleId, setActiveModuleId },
  } = useGlobalPanel()

  return (
    <Sidebar
      collapsible="icon"
      className="absolute h-full"
      aria-label="Panel modules"
    >
      <SidebarContent>
        <SidebarGroup className="px-2 py-3">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {modules.map((item) => {
                const isActive = item.id === activeModuleId

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label}
                      aria-current={isActive ? "true" : undefined}
                      aria-label={item.label}
                      onClick={() => setActiveModuleId(item.id)}
                      className="h-9 text-muted-foreground transition-[color,background-color,box-shadow] aria-current:bg-primary/10 aria-current:font-semibold aria-current:text-foreground aria-current:shadow-sm aria-current:ring-1 aria-current:ring-primary/20 aria-current:[&_svg]:text-primary"
                    >
                      <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
