"use client"

import {
  Controller,
  useWatch,
  type Control,
  type UseFormSetValue,
} from "react-hook-form"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldContent,
} from "@repo/ui-components/base/field"
import { Switch } from "@repo/ui-components/base/switch"
import { oklchToCss, type Oklch } from "@repo/domain-theme/colors"
import { HuePresetGrid } from "../colors"
import { autoForeground } from "../../utils/shade-generation"
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
    <FieldGroup className="space-y-4 flex flex-col flex-1 ">
      <Controller
        name="customAccent"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="theme-custom-accent">
              Add Custom Accent Color
            </FieldLabel>
            <FieldDescription>
              Add a custom accent color to your theme.
            </FieldDescription>
            <FieldContent>
              <Switch
                className="ml-auto shrink-0"
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
    </FieldGroup>
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
        <Field>
          <FieldLabel>Accent Color</FieldLabel>
          <FieldDescription>
            Pick a swatch generated from your primary color's harmony to use as
            the accent.
          </FieldDescription>
          <div className="mb-3 flex items-center gap-3">
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
              <span className="text-muted-foreground text-semibold uppercase text-xs">
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
          <FieldContent></FieldContent>
          {/* TODO: Render inside content for collapible/accordion for user to select color. */}
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
          <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
            {harmonies.map((harmony) => (
              // TODO:  Make these cards Accordion/collappsible Trigger
              <button
                key={harmony.type}
                type="button"
                onClick={() => field.onChange(harmony.type)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                  harmonyType === harmony.type
                    ? "border-primary/60 bg-primary/5"
                    : "border-border hover:border-border/80"
                }`}
              >
                <div className="flex gap-2 shrink-0 w-full justify-content-end items-center flex-1">
                  {harmony.colors.map((color) => (
                    <div
                      key={oklchToCss(color)}
                      className="size-6 rounded-md border border-white/20 shadow-sm"
                      style={{
                        backgroundColor: oklchToCss(color),
                        color: oklchToCss(autoForeground(color)),
                      }}
                    />
                  ))}
                </div>
                <div className="flex-1 min-w-0 w-5 h-5 flex flex-col  overflow-hidden">
                  <p className="text-sm font-medium">{harmony.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {harmony.description}
                  </p>
                </div>
                {harmonyType === harmony.type && (
                  <div className="size-2 rounded-full bg-primary shrink-0" />
                )}
              </button>
            ))}
          </div>
        </Field>
      )}
    />
  )
}
