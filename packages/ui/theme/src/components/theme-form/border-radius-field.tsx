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
    <FieldGroup className="space-y-4">
      <Controller
        name="borderRadius"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Border Radius</FieldLabel>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex gap-2 justify-evenly w-full items-center mt-3"
            >
              {RADIUS_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex flex-col items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
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
