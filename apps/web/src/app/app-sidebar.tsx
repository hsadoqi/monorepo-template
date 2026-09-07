import {
  Home01Icon,
  PaintBoardIcon,
  Settings02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui-components/base/sidebar"
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "@repo/ui-components/base/sheet"
import { ThemeForm } from "@repo/ui-theme/components"

const navigation = [
  { label: "Overview", icon: Home01Icon, href: "/" },
  { label: "Theme system", icon: PaintBoardIcon, href: "/" },
]

export const AppSidebar = () => {
  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-border/70 gap-0 border-b px-3 py-4">
        <div className="flex items-center gap-3 px-1 group-data-[collapsible=icon]:justify-center">
          <div className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-md text-sm font-semibold shadow-sm">
            T
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">Theme Studio</p>
            <p className="text-muted-foreground truncate text-xs">
              System workspace
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-muted-foreground/70 px-2 text-[10px] font-medium tracking-[0.12em] uppercase">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    className="h-9 text-sm font-medium"
                    render={<a href={item.href} />}
                    tooltip={item.label}
                    isActive={item.label === "Overview"}
                  >
                    <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-border/70 border-t p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <Sheet>
              <SheetTrigger
                render={
                  <SidebarMenuButton tooltip="Theme settings">
                    <HugeiconsIcon icon={Settings02Icon} strokeWidth={2} />
                    <span>Theme settings</span>
                  </SidebarMenuButton>
                }
              />
              <SheetContent className="gap-0 overflow-hidden">
                <SheetHeader className="shrink-0">
                  <SheetTitle>Theme settings</SheetTitle>
                  <SheetDescription>
                    Tune the appearance of this workspace.
                  </SheetDescription>
                </SheetHeader>
                <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
                  <ThemeForm />
                </div>
              </SheetContent>
            </Sheet>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
