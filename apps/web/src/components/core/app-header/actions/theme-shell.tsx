"use client";

import { IconButton } from "@repo/ui-components"
import { HugeiconsIcon } from "@hugeicons/react";
import { PaintBoardFreeIcons } from "@hugeicons/core-free-icons"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@repo/ui-components/base/sheet";
import { ThemeForm } from "@repo/ui-theme";

export const ThemeShell = () => {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <IconButton
            variant="outline"
            size="icon-sm"
            label="Theme Settings"
            tooltipSide="bottom"
          >
            <HugeiconsIcon icon={PaintBoardFreeIcons} />
          </IconButton>
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
  )
}
