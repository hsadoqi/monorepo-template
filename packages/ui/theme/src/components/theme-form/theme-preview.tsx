"use client"

import type { CSSProperties } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  File02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import type { ThemeCompilationResult } from "@repo/domain-theme/compiler"
import { Badge } from "@repo/ui-components/base/badge"
import { Button } from "@repo/ui-components/base/button"
import { Card, CardContent, CardHeader } from "@repo/ui-components/base/card"
import { Checkbox } from "@repo/ui-components/base/checkbox"
import { Input } from "@repo/ui-components/base/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui-components/base/tabs"
import { cn } from "@repo/ui-components/lib/utils"

type ThemePreviewProps = {
  compilation: ThemeCompilationResult
  className?: string
}

type PreviewStyle = CSSProperties & Record<`--${string}`, string>

function createPreviewStyle(
  cssVariables: ThemeCompilationResult["cssVariables"],
  isDarkMode: boolean
): PreviewStyle {
  return {
    ...cssVariables,
    "--background": "var(--color-default-bg)",
    "--foreground": "var(--color-default-fg)",
    "--card": isDarkMode
      ? "var(--color-default-950)"
      : "var(--color-default-50)",
    "--card-foreground": "var(--color-default-fg)",
    "--popover": isDarkMode
      ? "var(--color-default-950)"
      : "var(--color-default-50)",
    "--popover-foreground": "var(--color-default-fg)",
    "--primary": "var(--color-primary)",
    "--primary-foreground": "var(--color-primary-fg)",
    "--accent": isDarkMode
      ? "var(--color-accent, var(--color-primary-900))"
      : "var(--color-accent, var(--color-primary-100))",
    "--accent-foreground": isDarkMode
      ? "var(--color-accent-fg, var(--color-primary-100))"
      : "var(--color-accent-fg, var(--color-primary-950))",
    "--muted": isDarkMode
      ? "var(--color-primary-950)"
      : "var(--color-primary-50)",
    "--muted-foreground": isDarkMode
      ? "var(--color-primary-200)"
      : "var(--color-primary-700)",
    "--border": isDarkMode
      ? "var(--color-primary-800)"
      : "var(--color-primary-200)",
    "--input": isDarkMode
      ? "var(--color-primary-800)"
      : "var(--color-primary-200)",
    "--ring": "var(--color-primary)",
  }
}

function ContentPreview() {
  return (
    <article className="mx-auto w-full max-w-2xl">
      <div className="border-border/80 bg-card text-card-foreground overflow-hidden rounded-[calc(var(--radius)+0.5rem)] border shadow-[0_18px_55px_-36px_color-mix(in_oklch,var(--primary)_65%,transparent)]">
        <header className="border-border/70 flex items-center gap-3 border-b px-5 py-3">
          <span className="bg-primary/12 text-primary flex size-8 items-center justify-center rounded-[var(--radius)]">
            <HugeiconsIcon icon={File02Icon} className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="font-heading truncate text-sm font-semibold">
              Product direction
            </p>
            <p className="text-muted-foreground text-xs">Edited just now</p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            Planning
          </Badge>
        </header>

        <div className="space-y-6 px-6 py-8 sm:px-9 sm:py-10">
          <div className="max-w-[62ch] space-y-3">
            <h2
              className="font-heading font-semibold tracking-[-0.035em] text-balance"
              style={{
                fontSize: "calc(1.875rem * var(--font-scale, 1))",
                lineHeight: 1.15,
              }}
            >
              A calmer place for connected work
            </h2>
            <p
              className="text-muted-foreground leading-6"
              style={{ fontSize: "calc(0.875rem * var(--font-scale, 1))" }}
            >
              Bring notes, projects, and everyday context together without
              losing the relationships between them.
            </p>
          </div>

          <div className="bg-muted/70 border-border/70 rounded-[calc(var(--radius)+0.25rem)] border p-4">
            <p className="font-heading text-sm font-semibold">Next decision</p>
            <p className="text-muted-foreground mt-1 text-sm leading-6">
              Choose how themes move from a workspace into its documents and
              dashboards.
            </p>
            <a
              href="#theme-preview"
              onClick={(event) => event.preventDefault()}
              className="text-primary mt-3 inline-flex text-sm font-medium underline decoration-current/35 underline-offset-4 hover:decoration-current"
            >
              Review theme scopes
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Add to workspace</Button>
            <Button size="sm" variant="outline">
              Open document
            </Button>
            <span className="text-muted-foreground ml-auto text-xs">
              4 linked references
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

function ComponentsPreview() {
  return (
    <div className="mx-auto grid w-full max-w-2xl gap-4 md:grid-cols-2">
      <Card className="border-border/80 shadow-[0_14px_42px_-34px_color-mix(in_oklch,var(--primary)_70%,transparent)]">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-heading text-sm font-semibold">
                Quick capture
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Send an idea to your inbox.
              </p>
            </div>
            <Badge>Inbox</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative">
            <HugeiconsIcon
              icon={Search01Icon}
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            />
            <Input className="pl-9" placeholder="Search your workspace…" />
          </div>
          <div className="flex gap-2">
            <Button size="sm">Capture</Button>
            <Button size="sm" variant="secondary">
              Add details
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/80 shadow-[0_14px_42px_-34px_color-mix(in_oklch,var(--primary)_70%,transparent)]">
        <CardHeader>
          <p className="font-heading text-sm font-semibold">Today</p>
          <p className="text-muted-foreground text-xs">
            A small set of focused actions.
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            ["Review project notes", true],
            ["Refine dashboard layout", false],
            ["Connect related documents", false],
          ].map(([label, checked]) => (
            <label
              key={String(label)}
              className="border-border/70 hover:bg-muted/60 flex items-center gap-3 rounded-[var(--radius)] border px-3 py-2.5 text-sm transition-colors"
            >
              <Checkbox defaultChecked={Boolean(checked)} />
              <span className="min-w-0 flex-1 truncate">{label}</span>
              {checked && (
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="text-primary size-4"
                />
              )}
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export function ThemePreview({ compilation, className }: ThemePreviewProps) {
  const isDarkMode = compilation.theme?.isDarkMode ?? false

  return (
    <section
      id="theme-preview"
      aria-label="Theme preview"
      data-theme-preview
      data-theme={isDarkMode ? "dark" : "light"}
      style={createPreviewStyle(compilation.cssVariables, isDarkMode)}
      className={cn(
        "bg-background text-foreground min-h-full rounded-xl border p-3 transition-colors sm:p-5",
        isDarkMode && "dark",
        className
      )}
    >
      <Tabs defaultValue="content" className="min-h-full gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-sm font-semibold">Live preview</h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Compiled from your unsaved changes.
            </p>
          </div>
          <TabsList aria-label="Preview type">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="content" className="py-3 sm:py-6">
          <ContentPreview />
        </TabsContent>
        <TabsContent value="components" className="py-3 sm:py-6">
          <ComponentsPreview />
        </TabsContent>
      </Tabs>
    </section>
  )
}
