import type { OklchString } from "@repo/domain-theme/colors"
import type { ThemeCompilationInput } from "@repo/domain-theme"

import type { ThemeFormValues } from "./theme-form-schema"

/**
 * Maps validated form state to the domain compiler's input shape.
 * `primaryColor`/`accentColor` are already oklch()-validated by
 * `themeFormSchema`, so the cast to `OklchString` just carries that
 * guarantee across the form/domain boundary.
 */
export function toThemeCompilationInput(
  values: ThemeFormValues
): ThemeCompilationInput {
  return {
    primary: values.primaryColor as OklchString,
    accent: values.accentColor as OklchString | undefined,
    harmony: values.harmonyType,
    customAccent: values.customAccent,
    isDarkMode: values.isDarkMode,
    enableDarkMode: values.enableDarkMode,
    headingFont: values.headingFont,
    bodyFont: values.bodyFont,
    monoFont: values.monoFont,
    fontScale: values.fontScale,
    borderRadius:
      values.borderRadius !== undefined
        ? Number(values.borderRadius)
        : undefined,
  }
}
