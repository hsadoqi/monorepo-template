"use client"

import { useWatch, type Control } from "react-hook-form"
import { Field, FieldLabel } from "@repo/ui-components/base/field"
import { Button } from "@repo/ui-components/base/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui-components/base/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui-components/base/tooltip"
import { CopyButton } from "@repo/ui-components/buttons/copy-value"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui-components/base/collapsible"
import { Dices, TriangleAlert } from "lucide-react"
import { ChevronDown } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  oklchToCss,
  contrastRatio,
  getWCAGLevel,
} from "@repo/domain-theme/colors"
import { ColorPreviewStrip } from "../colors"
import {
  SpectrumChannelsPanel,
  SpectrumChannelsPanelMemo,
} from "@/components/colors/colors/pickers/spectrum-channels-panel"
import type { UseOklchColorReturn } from "../../hooks/use-oklch-color"
import type { ThemeFormValues } from "./theme-form-schema"

export type PrimaryColorFieldProps = {
  control: Control<ThemeFormValues>
  colorState: UseOklchColorReturn
  colorResetKey: number
}

/**
 * Owns the primary color card: swatch/popover editor, copy-to-clipboard
 * value, WCAG contrast readout, randomize button, and the collapsible full
 * spectrum panel + preview strip. Watches `isDarkMode` itself (rather than
 * the parent reading `form.getValues()`, which doesn't re-render this on
 * change) so the preview strip mode stays in sync when dark mode is toggled.
 */
export function PrimaryColorField({
  control,
  colorState,
  colorResetKey,
}: PrimaryColorFieldProps) {
  const isDarkMode = useWatch({ control, name: "isDarkMode" })
  const primaryColor = colorState.color
  const wcagLevel = getWCAGLevel(
    contrastRatio(oklchToCss(primaryColor), "oklch(95% 0 0)")
  )

  return (
    <Field key={colorResetKey}>
      <FieldLabel>Primary Color</FieldLabel>
      <div className="border-border/70 grid gap-4 rounded-lg border p-4">
        <Collapsible>
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    aria-label="Edit primary color"
                    className="border-border/70 size-10 shrink-0 rounded-md border shadow-sm transition-transform hover:scale-105"
                    style={{
                      backgroundColor: colorState.hex,
                    }}
                  />
                }
              />
              <PopoverContent className="w-72" align="start" alignOffset={50}>
                <SpectrumChannelsPanel
                  color={colorState.color}
                  setColor={colorState.setColor}
                  showTrigger={false}
                />
              </PopoverContent>
            </Popover>
            <div className="min-w-0 flex-1">
              <Tooltip>
                <TooltipTrigger
                  render={(triggerProps) => (
                    <CopyButton
                      {...triggerProps}
                      value={colorState.css}
                      label="primary color value"
                      className="block w-full text-left"
                      render={(copied) => (
                        <span
                          aria-live="polite"
                          className="block truncate font-mono text-xs tabular-nums"
                        >
                          {copied ? "Copied!" : colorState.css}
                        </span>
                      )}
                    />
                  )}
                />
                <TooltipContent
                  side="bottom"
                  align="center"
                  className="flex flex-col gap-1"
                >
                  Click to copy color value
                </TooltipContent>
              </Tooltip>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="font-medium">WCAG {wcagLevel}</span>
                <span className="text-muted-foreground">
                  {contrastRatio(
                    oklchToCss(primaryColor),
                    "oklch(95% 0 0)"
                  ).toFixed(2)}
                  :1
                </span>
                {!colorState.inGamut && (
                  <span
                    className="text-muted-foreground flex items-center"
                    title="Chroma reduced to render in sRGB"
                  >
                    <TriangleAlert className="size-3.5" aria-hidden />
                    <span className="sr-only">
                      Chroma reduced to render in sRGB
                    </span>
                  </span>
                )}
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={colorState.randomize}
              className="size-9 shrink-0"
              aria-label="Randomize color"
            >
              <Dices className="size-3.5" aria-hidden />
            </Button>
          </div>
          <CollapsibleTrigger>
            <HugeiconsIcon
              icon={ChevronDown}
              className="size-4 shrink-0 transition-transform data-[state=open]:rotate-180 ml-auto mt-4"
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3">
            <SpectrumChannelsPanelMemo
              color={colorState.color}
              setColor={colorState.setColor}
            />
            <div className="mt-6">
              <ColorPreviewStrip
                colors={[colorState.color]}
                mode={isDarkMode ? "dark" : "light"}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Field>
  )
}
