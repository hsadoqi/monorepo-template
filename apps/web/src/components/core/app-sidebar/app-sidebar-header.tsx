import { useActiveRoute } from "@/hooks/use-active-route";
import { SidebarHeader } from "@repo/ui-components/base/sidebar";

export const AppSidebarHeader = () => {
  const { title } = useActiveRoute()
  return (
    <SidebarHeader className="border-border/70 gap-0 border-b px-3 py-4">
      <div className="flex items-center gap-3 px-1 group-data-[collapsible=icon]:justify-center">
        <div className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-md text-sm font-semibold shadow-sm">
          S
        </div>
        <div className="min-w-0 group-data-[collapsible=icon]:hidden">
          <p className="truncate text-sm font-semibold">Synapcity</p>
          <p className="text-muted-foreground truncate text-xs">
            {title}
          </p>
        </div>
      </div>
    </SidebarHeader>
  )
}
