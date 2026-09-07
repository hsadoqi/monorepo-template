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
  FieldContent,
  FieldGroup,
} from "@repo/ui-components/base/field"
import { Switch } from "@repo/ui-components/base/switch"
import ThemeSwitch from "../dark-mode/theme-switch"
import type { ThemeFormValues } from "./theme-form-schema"

export type AppearanceFieldsProps = {
  control: Control<ThemeFormValues>
  setValue: UseFormSetValue<ThemeFormValues>
}

/**
 * Owns the "Enable Dark Mode" / "Dark Mode" pair, including watching
 * `enableDarkMode` to disable the second switch. Scoped here (rather than a
 * `form.watch` in the parent) so toggling either switch re-renders only this
 * pair, not the whole form.
 */
export function AppearanceFields({ control, setValue }: AppearanceFieldsProps) {
  const enableDarkMode = useWatch({ control, name: "enableDarkMode" })

  return (
    <FieldGroup className="space-y-4 flex flex-col items-end flex-1">
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="enableDarkMode"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="theme-enable-dark-mode">
                Enable Dark Mode
              </FieldLabel>
              <FieldContent>
                <Switch
                  id="theme-enable-dark-mode"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                    if (!checked) {
                      setValue("isDarkMode", undefined, {
                        shouldDirty: true,
                      })
                    }
                  }}
                />
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          name="isDarkMode"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="theme-is-dark-mode">Dark Mode</FieldLabel>
              <FieldContent>
                <ThemeSwitch
                  id="theme-is-dark-mode"
                  checked={field.value ?? false}
                  disabled={!enableDarkMode}
                  onCheckedChange={field.onChange}
                />
              </FieldContent>
            </Field>
          )}
        />
      </div>
    </FieldGroup>
  )
}
