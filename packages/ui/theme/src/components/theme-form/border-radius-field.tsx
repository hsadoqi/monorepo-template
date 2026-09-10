"use client"

import { Controller, type Control } from "react-hook-form"
import { Field, FieldGroup, FieldLabel } from "@repo/ui-components/base/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@repo/ui-components/base/radio-group"
import { RADIUS_OPTIONS, type ThemeFormValues } from "./theme-form-schema"

export type BorderRadiusFieldProps = {
  control: Control<ThemeFormValues>
}

export function BorderRadiusField({ control }: BorderRadiusFieldProps) {
  return (
    <FieldGroup>
      <Controller
        name="borderRadius"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Corner radius</FieldLabel>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="mt-3 grid grid-cols-5 gap-2"
            >
              {RADIUS_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex min-w-0 cursor-pointer flex-col items-center gap-2 rounded-lg border p-2 transition-colors ${
                    field.value === option.value
                      ? "border-primary/60 bg-primary/5"
                      : "border-border hover:border-border/80"
                  }`}
                >
                  <div
                    className="size-8 border-2 border-primary/40"
                    style={{ borderRadius: option.style }}
                  />
                  <RadioGroupItem value={option.value} className="sr-only" />
                  <span className="text-xs text-center font-medium">
                    {option.label}
                  </span>
                </label>
              ))}
            </RadioGroup>
          </Field>
        )}
      />
    </FieldGroup>
  )
}
