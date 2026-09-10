"use client"

import {
  Controller,
  useWatch,
  type Control,
  type UseFormSetValue,
} from "react-hook-form"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldContent,
} from "@repo/ui-components/base/field"
import { Switch } from "@repo/ui-components/base/switch"
import { oklchToCss, type Oklch } from "@repo/domain-theme/colors"
import { HuePresetGrid } from "../colors"
import type { UseOklchColorReturn } from "../../hooks/use-oklch-color"
import type { ColorHarmonyResult } from "../../utils/get-color-harmonies"
import type { ThemeFormValues } from "./theme-form-schema"

export type CustomAccentToggleProps = {
  control: Control<ThemeFormValues>
  setValue: UseFormSetValue<ThemeFormValues>
  accentColorState: UseOklchColorReturn
}

/**
 * The "Add Custom Accent Color" switch. Clears `accentColor`/`harmonyType`
 * when turned off so a hidden `AccentColorPicker` can't leave stale data in
 * the submitted form.
 */
export function CustomAccentToggle({
  control,
  setValue,
  accentColorState,
}: CustomAccentToggleProps) {
  return (
    <Controller
      name="customAccent"
      control={control}
      render={({ field }) => (
        <Field orientation="horizontal" className="items-center gap-4">
          <div className="min-w-0 flex-1">
            <FieldLabel htmlFor="theme-custom-accent">Use an accent</FieldLabel>
            <FieldDescription className="mt-1">
              Add a second color generated from your primary color.
            </FieldDescription>
          </div>
          <FieldContent className="shrink-0">
            <Switch
              id="theme-custom-accent"
              checked={!!(field.value ?? false)}
              onCheckedChange={(checked) => {
                field.onChange(checked)
                if (!checked) {
                  accentColorState.clear()
                  setValue("accentColor", undefined, { shouldDirty: true })
                  setValue("harmonyType", undefined, { shouldDirty: true })
                }
              }}
            />
          </FieldContent>
        </Field>
      )}
    />
  )
}

export type AccentColorPickerProps = {
  control: Control<ThemeFormValues>
  primaryColor: Oklch
  harmonies: ColorHarmonyResult[]
  accentColorState: UseOklchColorReturn
}

/**
 * The harmony swatch picker, shown once "Add Custom Accent Color" is on.
 * Watches `customAccent`/`harmonyType` itself so toggling the switch or
 * picking a swatch re-renders only this section, not the whole form.
 */
export function AccentColorPicker({
  control,
  primaryColor,
  harmonies,
  accentColorState,
}: AccentColorPickerProps) {
  const customAccent = useWatch({ control, name: "customAccent" })
  const harmonyType = useWatch({ control, name: "harmonyType" })

  if (!customAccent) return null

  return (
    <Controller
      name="harmonyType"
      control={control}
      render={({ field }) => (
        <Field className="mt-5 border-t pt-5">
          <FieldLabel>Accent color</FieldLabel>
          <FieldDescription>
            Pick a swatch generated from your primary color's harmony to use as
            the accent.
          </FieldDescription>
          <div className="my-4 flex items-center gap-3">
            <div
              className="border-border/70 size-8 shrink-0 rounded-md border shadow-sm"
              style={{ backgroundColor: accentColorState.hex }}
              aria-hidden
            />
            <div className="flex flex-col items-start gap-1">
              <span className="text-muted-foreground truncate font-mono text-xs">
                {accentColorState.isSet
                  ? accentColorState.css
                  : "No accent selected yet"}
              </span>
              <span className="text-muted-foreground text-[0.6875rem] font-medium uppercase tracking-wide">
                {accentColorState.isSet && harmonyType && (
                  <>
                    {harmonyType?.charAt(0).toUpperCase() +
                      harmonyType?.slice(1)}{" "}
                    harmony
                  </>
                )}
              </span>
            </div>
          </div>
          <HuePresetGrid
            color={primaryColor}
            categories={harmonies
              .filter((harmony) => harmony.colors.length > 0)
              .map((harmony) => harmony.name)}
            swatches={harmonies.flatMap((harmony) =>
              harmony.colors.map((color, index) => ({
                ...color,
                name: `${harmony.name} ${index + 1}`,
                category: harmony.name,
              }))
            )}
            onColorSelect={(color) => {
              accentColorState.setColor(color)

              const selectedHarmony = harmonies.find((harmony) =>
                harmony.colors.some(
                  (candidate) => oklchToCss(candidate) === oklchToCss(color)
                )
              )

              if (selectedHarmony) {
                field.onChange(selectedHarmony.type)
              }
            }}
          />
        </Field>
      )}
    />
  )
}
