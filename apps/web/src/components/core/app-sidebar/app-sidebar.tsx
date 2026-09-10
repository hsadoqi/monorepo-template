"use client"

import { Settings02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Sidebar,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
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
import { AppSidebarHeader } from "./app-sidebar-header"
import { AppSidebarContent } from "./app-sidebar-content"
import { useClickOutside } from "@/hooks"
import { useRef } from "react"

export const AppSidebar = () => {
  const sidebarRef = useRef(null)
  const { open, toggleSidebar } = useSidebar()

  useClickOutside(
    sidebarRef,
    () => {
      if (!open) return
      if (open) toggleSidebar()
    },
    {
      enabled: true,
    }
  )
  return (
    <Sidebar ref={sidebarRef} side="left" variant="sidebar" collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarContent />
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
              <SheetContent className="w-[calc(100vw-1rem)] gap-0 overflow-hidden p-0 sm:max-w-[min(72rem,calc(100vw-2rem))]">
                <SheetHeader className="shrink-0">
                  <SheetTitle>Theme settings</SheetTitle>
                  <SheetDescription>
                    Tune the appearance of this workspace.
                  </SheetDescription>
                </SheetHeader>
                <div className="min-h-0 flex-1 overflow-hidden">
                  <ThemeForm className="h-full" />
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
