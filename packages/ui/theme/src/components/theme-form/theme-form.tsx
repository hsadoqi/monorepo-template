"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"
import { Field, FieldGroup } from "@repo/ui-components/base/field"
import { Button } from "@repo/ui-components/base/button"
import {
  parseOklchString,
  oklchToCss,
  DEFAULT_PRIMARY_COLOR,
} from "@repo/domain-theme/colors"
import { compile } from "@repo/domain-theme/compiler"
import { getColorHarmonies } from "../../utils/get-color-harmonies"
import { useOklchColor, DEFAULT_OKLCH_COLOR } from "../../hooks/use-oklch-color"
import { themeFormSchema, type ThemeFormValues } from "./theme-form-schema"
import { toThemeCompilationInput } from "./theme-form-mapper"
import { AppearanceFields } from "./appearance-fields"
import { CustomAccentToggle, AccentColorPicker } from "./accent-color-section"
import { PrimaryColorField } from "./primary-color-field"
import { TypographyFields } from "./typography-fields"
import { BorderRadiusField } from "./border-radius-field"

export { themeFormSchema }

export const ThemeForm = () => {
  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(themeFormSchema),
    defaultValues: {
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
    },
  })

  const [colorResetKey, setColorResetKey] = React.useState(0)

  const colorState = useOklchColor({
    initial:
      parseOklchString(form.getValues("primaryColor")) ?? DEFAULT_OKLCH_COLOR,
    onChange: (color) =>
      form.setValue("primaryColor", oklchToCss(color), {
        shouldDirty: true,
        shouldValidate: true,
      }),
  })

  const primaryColor = colorState.color

  // `getColorHarmonies` runs nine hue-rotation + gamut-fit passes; `primaryColor`
  // is only a new object when the color actually changes (see useOklchColor),
  // so this avoids recomputing whenever this component re-renders for an
  // unrelated reason.
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

  function onSubmit(data: z.infer<typeof themeFormSchema>) {
    const { theme, cssVariables, report } = compile(
      toThemeCompilationInput(data)
    )

    if (!report.success || !theme) {
      toast.error("Theme compilation failed", {
        description: report.errors.join(", "),
        position: "bottom-right",
      })
      return
    }

    if (report.warnings.length > 0) {
      toast.warning("Theme compiled with warnings", {
        description: report.warnings.join(", "),
        position: "bottom-right",
      })
    }

    toast("Theme configuration saved:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground text-xs">
          <code>{JSON.stringify({ theme, cssVariables }, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
    })
  }

  return (
    <div className="space-y-6 px-2 py-4">
      <form id="form-theme" onSubmit={form.handleSubmit(onSubmit)}>
        {/* <FieldGroup className="space-y-4"> */}
        <FieldGroup className="space-y-4">
          {/* <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="theme-name">Name</FieldLabel>
                  <InputGroupInput
                    {...field}
                    id="theme-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Untitled"
                    maxLength={64}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="theme-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="theme-description"
                      placeholder="Describe your theme..."
                      rows={3}
                      className="min-h-20 resize-none"
                      maxLength={256}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums text-xs">
                        {field.value?.length || 0}/256
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <Controller
                name="tags"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="theme-tags">Tags</FieldLabel>
                    <TagsInput
                      field={{
                        ...field,
                        value: field.value || [],
                      }}
                    />
                    <FieldDescription>
                      Comma-separated tags for organization
                    </FieldDescription>
                  </Field>
                )}
              />
            </div> */}
          <div className="flex">
            <CustomAccentToggle
              control={form.control}
              setValue={form.setValue}
              accentColorState={accentColorState}
            />
            <AppearanceFields control={form.control} setValue={form.setValue} />
          </div>
          {/* </div> */}

          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 w-full">
              <PrimaryColorField
                control={form.control}
                colorState={colorState}
                colorResetKey={colorResetKey}
              />
            </div>

            <AccentColorPicker
              control={form.control}
              primaryColor={primaryColor}
              harmonies={harmonies}
              accentColorState={accentColorState}
            />
          </FieldGroup>

          <TypographyFields control={form.control} />

          <BorderRadiusField control={form.control} />
        </FieldGroup>
      </form>

      <Field
        orientation="horizontal"
        className="gap-2 pt-4 border-t border-border"
      >
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.reset()
            setColorResetKey((key) => key + 1)
          }}
        >
          Reset
        </Button>
        <Button type="submit" form="form-theme" className="flex-1">
          Save Theme
        </Button>
      </Field>
    </div>
  )
}
