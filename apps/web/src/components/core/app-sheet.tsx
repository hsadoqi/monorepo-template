"use client"

import { ThemeForm, ThemeMetadataForm } from "@repo/ui-theme/components"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@repo/ui-components/base/sheet"
import { Button } from "@repo/ui-components/base/button"
import Link from "next/link"
import { Paintbrush } from "lucide-react"
import { ScrollArea } from "@repo/ui-components/base/scroll-area"

export const AppSheet = () => {
  return (
    <Sheet>
      <header className="border-border/80 bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-6">
            <Link
              href="/"
              className="font-heading text-sm font-semibold tracking-tight"
            >
              Synapcity
            </Link>
            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 sm:flex"
            >
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href="/" />}
              >
                Theme lab
              </Button>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href="/settings" />}
              >
                Settings
              </Button>
            </nav>
          </div>

          <SheetTrigger
            render={
              <Button variant="outline" size="lg">
                <Paintbrush data-icon="inline-start" aria-hidden="true" />
                <span className="sm:hidden">Edit</span>
                <span className="hidden sm:inline">Edit theme</span>
              </Button>
            }
          />
        </div>
      </header>

      <SheetContent className="gap-0 overflow-hidden p-0">
        <SheetHeader className="border-border/80 bg-background/95 supports-backdrop-filter:bg-background/80 shrink-0 border-b px-6 py-4 backdrop-blur">
          <ThemeMetadataForm />
        </SheetHeader>
        <ScrollArea className="min-h-0 flex-1">
          <div className="px-6 pb-6">
            <ThemeForm />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
