"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@repo/ui-components/base/button"
import {
  parseOklchString,
  oklchToCss,
  DEFAULT_PRIMARY_COLOR,
} from "@repo/domain-theme/colors"
import {
  compile,
  type ThemeCompilationResult,
} from "@repo/domain-theme/compiler"
import { cn } from "@repo/ui-components/lib/utils"
import { getColorHarmonies } from "../../utils/get-color-harmonies"
import { useOklchColor, DEFAULT_OKLCH_COLOR } from "../../hooks/use-oklch-color"
import { themeFormSchema, type ThemeFormValues } from "./theme-form-schema"
import { toThemeCompilationInput } from "./theme-form-mapper"
import { AppearanceFields } from "./appearance-fields"
import { CustomAccentToggle, AccentColorPicker } from "./accent-color-section"
import { PrimaryColorField } from "./primary-color-field"
import { TypographyFields } from "./typography-fields"
import { BorderRadiusField } from "./border-radius-field"
import { ThemePreview } from "./theme-preview"
import { ScrollArea } from "@repo/ui-components/base/scroll-area"

export { themeFormSchema }

export type ThemeFormProps = {
  className?: string
  onSave?: (
    values: ThemeFormValues,
    compilation: ThemeCompilationResult
  ) => void
}

const DEFAULT_VALUES: ThemeFormValues = {
  primaryColor: DEFAULT_PRIMARY_COLOR,
  harmonyType: "complementary",
  headingFont: "system-ui",
  bodyFont: "system-ui",
  monoFont: "system-ui",
  fontScale: 1,
  borderRadius: "0.5",
  isDarkMode: undefined,
  enableDarkMode: false,
  customAccent: false,
}

const DEFAULT_PRIMARY_OKLCH =
  parseOklchString(DEFAULT_PRIMARY_COLOR) ?? DEFAULT_OKLCH_COLOR

function compileDraft(values: unknown): ThemeCompilationResult | null {
  const parsed = themeFormSchema.safeParse(values)
  if (!parsed.success) return null

  const compilation = compile(toThemeCompilationInput(parsed.data))
  return compilation.report.success && compilation.theme ? compilation : null
}

function EditorSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="border-border/70 border-b px-1 py-6 last:border-b-0">
      <div className="mb-5">
        <h2 className="font-heading text-sm font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-1 max-w-[48ch] text-xs leading-5">
          {description}
        </p>
      </div>
      {children}
    </section>
  )
}

export function ThemeForm({ className, onSave }: ThemeFormProps) {
  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(themeFormSchema),
    defaultValues: DEFAULT_VALUES,
  })
  const formId = React.useId()
  const draftValues = useWatch({ control: form.control })
  const [colorResetKey, setColorResetKey] = React.useState(0)
  const [compactView, setCompactView] = React.useState<"customize" | "preview">(
    "customize"
  )

  const initialCompilation = React.useMemo(() => {
    const result = compileDraft(DEFAULT_VALUES)
    if (!result) throw new Error("Default theme values must compile")
    return result
  }, [])
  const lastSuccessfulCompilation = React.useRef(initialCompilation)

  const draftCompilation = React.useMemo(
    () => compileDraft(draftValues),
    [draftValues]
  )
  if (draftCompilation) {
    lastSuccessfulCompilation.current = draftCompilation
  }
  const previewCompilation = lastSuccessfulCompilation.current

  const colorState = useOklchColor({
    initial:
      parseOklchString(form.getValues("primaryColor")) ?? DEFAULT_PRIMARY_OKLCH,
    onChange: (color) =>
      form.setValue("primaryColor", oklchToCss(color), {
        shouldDirty: true,
        shouldValidate: true,
      }),
  })

  const primaryColor = colorState.color
  const harmonies = React.useMemo(
    () => getColorHarmonies(primaryColor),
    [primaryColor]
  )

  const accentColorState = useOklchColor({
    initial: parseOklchString(form.getValues("accentColor") ?? "") ?? undefined,
    onChange: (color) =>
      form.setValue("accentColor", oklchToCss(color), {
        shouldDirty: true,
        shouldValidate: true,
      }),
  })

  function handleSubmit(data: ThemeFormValues) {
    const compilation = compile(toThemeCompilationInput(data))

    if (!compilation.report.success || !compilation.theme) {
      toast.error("Theme could not be saved", {
        description:
          compilation.report.errors.join(", ") ||
          "Check the highlighted theme values and try again.",
        position: "bottom-right",
      })
      return
    }

    onSave?.(data, compilation)

    if (compilation.report.warnings.length > 0) {
      toast.warning(
        onSave ? "Theme saved with warnings" : "Preview compiled with warnings",
        {
          description: compilation.report.warnings.join(", "),
          position: "bottom-right",
        }
      )
      return
    }

    toast.success(onSave ? "Theme saved" : "Theme preview is ready", {
      description: onSave
        ? "Your theme is ready to use."
        : "Connect this editor to a theme library to persist the draft.",
      position: "bottom-right",
    })
  }

  const controls = (
    <div className="h-full overflow-hidden px-4 sm:px-5 lg:px-6">
      <ScrollArea dir="vertical" className="h-full">
        <EditorSection
          title="Colors"
          description="Set the primary identity, then add a harmonious accent when the theme needs a second voice."
        >
          <div className="space-y-6">
            <PrimaryColorField
              control={form.control}
              colorState={colorState}
              colorResetKey={colorResetKey}
            />
            <div className="border-border/70 rounded-lg border p-4">
              <CustomAccentToggle
                control={form.control}
                setValue={form.setValue}
                accentColorState={accentColorState}
              />
              <AccentColorPicker
                control={form.control}
                primaryColor={primaryColor}
                harmonies={harmonies}
                accentColorState={accentColorState}
              />
            </div>
          </div>
        </EditorSection>

        <EditorSection
          title="Typography"
          description="Choose typefaces for hierarchy, reading, and technical content."
        >
          <TypographyFields control={form.control} />
        </EditorSection>

        <EditorSection
          title="Shape"
          description="Control how soft or precise containers and controls feel."
        >
          <BorderRadiusField control={form.control} />
        </EditorSection>

        <EditorSection
          title="Appearance"
          description="Enable and inspect the dark presentation of this theme draft."
        >
          <AppearanceFields control={form.control} setValue={form.setValue} />
        </EditorSection>
      </ScrollArea>
    </div>
  )

  const preview = (
    <div className="bg-muted/35 min-h-full p-3 sm:p-5 lg:p-6">
      <ThemePreview
        compilation={previewCompilation}
        className="lg:sticky lg:top-6 lg:min-h-152"
      />
      {!draftCompilation && (
        <p
          role="status"
          className="border-border bg-background text-muted-foreground mx-auto mt-3 max-w-xl rounded-md border px-3 py-2 text-xs"
        >
          Previewing your last valid changes. Finish the current value to update
          the preview.
        </p>
      )}
    </div>
  )

  return (
    <div
      className={cn(
        "bg-background text-foreground flex min-h-0 flex-col overflow-hidden",
        className
      )}
    >
      <form
        id={formId}
        onSubmit={form.handleSubmit(handleSubmit)}
        className="contents"
      >
        <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(20rem,25rem)_minmax(32rem,1fr)]">
          <div className="border-border/70 bg-background sticky top-0 z-10 shrink-0 border-b p-3 lg:hidden">
            <div
              role="tablist"
              className="grid w-full grid-cols-2"
              aria-label="Theme editor view"
            >
              {(["customize", "preview"] as const).map((view) => (
                <button
                  key={view}
                  type="button"
                  role="tab"
                  id={`${formId}-${view}-tab`}
                  aria-controls={`${formId}-${view}-panel`}
                  aria-selected={compactView === view}
                  tabIndex={compactView === view ? 0 : -1}
                  onClick={() => setCompactView(view)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
                      return
                    event.preventDefault()
                    setCompactView(
                      view === "customize" ? "preview" : "customize"
                    )
                  }}
                  className="text-muted-foreground hover:text-foreground aria-selected:bg-muted aria-selected:text-foreground rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  {view === "customize" ? "Customize" : "Preview"}
                </button>
              ))}
            </div>
          </div>

          <div
            id={`${formId}-customize-panel`}
            role="tabpanel"
            aria-labelledby={`${formId}-customize-tab`}
            className={cn(
              "min-h-0 flex-1 overflow-y-auto lg:block lg:border-r",
              compactView !== "customize" && "hidden"
            )}
          >
            {controls}
          </div>
          <div
            id={`${formId}-preview-panel`}
            role="tabpanel"
            aria-labelledby={`${formId}-preview-tab`}
            className={cn(
              "min-h-0 flex-1 overflow-y-auto lg:block",
              compactView !== "preview" && "hidden"
            )}
          >
            {preview}
          </div>
        </div>

        <footer className="border-border/70 bg-background/95 supports-backdrop-filter:bg-background/85 z-20 flex shrink-0 items-center gap-2 border-t px-4 py-3 backdrop-blur sm:px-5">
          <p className="text-muted-foreground hidden min-w-0 flex-1 truncate text-xs sm:block">
            {form.formState.isDirty
              ? "Unsaved changes are visible in the preview."
              : "Start with the default theme or adjust any value."}
          </p>
          <Button
            type="button"
            variant="outline"
            disabled={!form.formState.isDirty}
            onClick={() => {
              form.reset(DEFAULT_VALUES)
              colorState.setColor(DEFAULT_PRIMARY_OKLCH)
              accentColorState.clear()
              setColorResetKey((key) => key + 1)
            }}
          >
            Reset
          </Button>
          <Button type="submit" className="min-w-28">
            {onSave ? "Save theme" : "Finish preview"}
          </Button>
        </footer>
      </form>
    </div>
  )
}
