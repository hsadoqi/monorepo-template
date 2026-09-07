import { Button } from "@repo/ui-components/base/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@repo/ui-components/base/sheet"
import {
  SidebarTrigger,
  SidebarSeparator,
} from "@repo/ui-components/base/sidebar"
import { ThemeForm, ThemeMetadataForm } from "@repo/ui-theme"

import { AppearanceToggle } from "@/components/appearance-toggle"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui-components/base/collapsible"

export const AppContentHeader = () => {
  return (
    <header className="bg-background/90 supports-backdrop-filter:bg-background/75 sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b px-4 backdrop-blur-md">
      <SidebarTrigger />
      <SidebarSeparator orientation="vertical" className="h-4" />
      <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
        <p className="truncate text-sm font-medium">Theme system</p>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              }
            />

            <SheetContent className="gap-0 overflow-hidden">
              <SheetHeader className="shrink-0">
                <Collapsible>
                  <CollapsibleTrigger className="border-border/80 bg-background/95 w-full rounded-t-lg border-b text-left backdrop-blur">
                    <div className="flex items-center justify-between gap-2">
                      Untitled Theme
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="border-border/80 bg-background/95 border-b px-6 py-4 backdrop-blur">
                    <ThemeMetadataForm />
                  </CollapsibleContent>
                </Collapsible>
              </SheetHeader>
              <div
                data-slot="theme-sheet-body"
                className="min-h-0 flex-1 overflow-y-auto px-4 pb-6"
              >
                <ThemeForm />
              </div>
            </SheetContent>
          </Sheet>
          <AppearanceToggle />
        </div>
      </div>
    </header>
  )
}
