import { SidebarContent } from "@repo/ui-components/base/sidebar"
import { groups } from "@/lib/data/navigation"
import { AppSidebarGroup } from "./app-sidebar-group"

export const AppSidebarContent = () => {
  return (
    <SidebarContent className="px-2 py-3">
      {groups.map((group) => (
        <AppSidebarGroup key={group.label} group={group} />
      ))}
    </SidebarContent>
  )
}
