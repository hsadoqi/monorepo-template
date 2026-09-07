import * as z from "zod"
import { parseOklchString } from "@repo/domain-theme/colors"
import { GOOGLE_FONTS } from "@repo/runtime-theme/fonts"

export const RADIUS_OPTIONS = [
  { value: "0", label: "None", style: "0px" },
  { value: "0.25", label: "Small", style: "4px" },
  { value: "0.5", label: "Medium", style: "8px" },
  { value: "1", label: "Large", style: "16px" },
  { value: "1.5", label: "Extra Large", style: "24px" },
] as const

// `GOOGLE_FONTS` (from @repo/runtime-theme/fonts) is the same list
// `FontCombobox` renders, so a font field can only ever hold one of these —
// validate against the same source of truth rather than a separate list.
const googleFont = z.enum(GOOGLE_FONTS as [string, ...string[]])

const oklchCssString = z
  .string()
  .refine((value) => parseOklchString(value) !== null, {
    message: "Must be a valid oklch() color",
  })

export const themeFormSchema = z.object({
  primaryColor: oklchCssString,
  harmonyType: z
    .enum([
      "complementary",
      "analogous",
      "split-complementary",
      "triadic",
      "tetradic",
      "square",
      "rectangle",
      "double-split-complementary",
      "monochromatic",
    ])
    .optional(),
  headingFont: googleFont.optional(),
  bodyFont: googleFont.optional(),
  monoFont: googleFont.optional(),
  fontScale: z.number().min(0.75).max(1.5),
  borderRadius: z.enum(["0", "0.25", "0.5", "1", "1.5"]).optional(),
  isDarkMode: z.boolean().optional(),
  enableDarkMode: z.boolean(),
  customAccent: z.boolean(),
  accentColor: oklchCssString.optional(),
})

export type ThemeFormValues = z.infer<typeof themeFormSchema>
