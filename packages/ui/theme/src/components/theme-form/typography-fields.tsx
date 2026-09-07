"use client"

import { Controller, useWatch, type Control } from "react-hook-form"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@repo/ui-components/base/field"
import { Slider } from "@repo/ui-components/base/slider"
import { FontCombobox } from "../fonts"
import type { ThemeFormValues } from "./theme-form-schema"

export type TypographyFieldsProps = {
  control: Control<ThemeFormValues>
}

const FONT_FIELDS = [
  { name: "headingFont", label: "Heading Font" },
  { name: "bodyFont", label: "Body Font" },
  { name: "monoFont", label: "Mono Font" },
] as const

/**
 * Owns the heading/body/mono font pickers (searchable against the shared
 * Google Fonts list, via `FontCombobox`) and the font-scale slider. Watches
 * `fontScale` itself so dragging the slider re-renders only this group, not
 * the whole form.
 */
export function TypographyFields({ control }: TypographyFieldsProps) {
  const fontScale = useWatch({ control, name: "fontScale" })

  return (
    <FieldGroup className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {FONT_FIELDS.map(({ name, label }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <Field>
                <FontCombobox
                  label={label}
                  value={field.value ?? "system-ui"}
                  onChange={field.onChange}
                />
              </Field>
            )}
          />
        ))}
      </div>

      <Controller
        name="fontScale"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel style={{ fontSize: `${fontScale}rem` }}>
              Font Scale
            </FieldLabel>
            <FieldDescription className="mb-2">
              {(fontScale * 100).toFixed(0)}%
            </FieldDescription>
            <Slider
              value={[fontScale]}
              onValueChange={(v) => field.onChange(Array.isArray(v) ? v[0] : v)}
              min={0.75}
              max={1.5}
              step={0.05}
              className="w-full"
            />
          </Field>
        )}
      />
    </FieldGroup>
  )
}
