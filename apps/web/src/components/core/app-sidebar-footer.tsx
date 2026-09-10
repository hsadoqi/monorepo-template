import { Settings02Icon } from "@hugeicons/core-free-icons";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@repo/ui-components/base/sheet";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@repo/ui-components/base/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { ThemeForm } from "@repo/ui-theme"

export const AppSidebarFooter = () => {
  return (
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
  )
}
