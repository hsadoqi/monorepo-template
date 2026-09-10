/**
 * Theme compilation: canonical definitions → CSS variables artifact.
 *
 * Transforms theme input (base colors + mode, plus typography and radius)
 * into deterministic CSS custom properties, deriving palettes, semantic
 * colors, and accessible foregrounds. Typography/radius are passed through
 * as-is — they don't need the derivation colors do.
 *
 * Deterministic: same input always produces identical output.
 * No side effects, no async operations.
 */

import { DEFAULT_OKLCH } from "../colors"
import {
  generatePaletteScale,
  getAccessibleForeground,
  Oklch,
  oklchToCss,
  ShadeStep,
  toOklch,
  validateOklch,
} from "../colors"
import type {
  ThemeCompilationInput,
  ThemeCompilationResult,
  ResolvedTheme,
  ResolvedThemeTypography,
  CssVariables,
  ThemeCompilationReport,
} from "./model"

const PRIMARY_SEMANTIC_STEP = { light: 700, dark: 300 } as const
const PRIMARY_RING_STEP = { light: 600, dark: 400 } as const
const ACCENT_SEMANTIC_STEP = { light: 100, dark: 900 } as const

/**
 * Compile a theme definition into CSS variables and a resolved theme.
 *
 * @param input Theme colors and mode settings
 * @returns Compilation result with resolved theme, CSS variables, and report
 */
export function compile(input: ThemeCompilationInput): ThemeCompilationResult {
  const errors: string[] = []
  const warnings: string[] = []

  try {
    const {
      primary,
      primaryAnchorShade = 500,
      accent,
      accentAnchorShade = 500,
      isDarkMode,
      customAccent,
      harmony,
      headingFont,
      bodyFont,
      monoFont,
      fontScale,
      borderRadius,
    } = input

    // Validate primary color is required
    if (!primary) {
      errors.push(
        "Primary color is required: all theme definitions need a base color for shade palette generation"
      )
      return {
        theme: null,
        cssVariables: {},
        report: createReport(false, errors, warnings),
      }
    }

    // Normalize and validate primary color
    let primaryOklch
    try {
      primaryOklch = toOklch(primary)
      const validation = validateOklch(primary)
      if (!validation.success) {
        errors.push(`Invalid primary color: ${String(validation.error)}`)
        return {
          theme: null,
          cssVariables: {},
          report: createReport(false, errors, warnings),
        }
      }
    } catch (err) {
      errors.push(
        `Failed to parse primary color: ${err instanceof Error ? err.message : String(err)}`
      )
      return {
        theme: null,
        cssVariables: {},
        report: createReport(false, errors, warnings),
      }
    }

    // Normalize accent color if provided
    let accentOklch
    if (customAccent && accent) {
      try {
        accentOklch = toOklch(accent)
        const validation = validateOklch(accent)
        if (!validation.success) {
          warnings.push(
            `Invalid accent color: ${String(validation.error)}, using primary only`
          )
          accentOklch = undefined
        }
      } catch (err) {
        warnings.push(
          `Failed to parse accent color: ${err instanceof Error ? err.message : String(err)}, using primary only`
        )
        accentOklch = undefined
      }
    }

    // isDarkMode is the resolved appearance (already determined at Runtime layer)
    const shouldUseDarkMode = isDarkMode

    // Get accessible foreground colors
    let primaryBg: Oklch
    let accentBg: Oklch | undefined
    let defaultBg: Oklch

    try {
      const primaryBgResult = getBackgroundForColor(
        primaryOklch,
        shouldUseDarkMode,
        primaryAnchorShade
      )
      if (!primaryBgResult) {
        errors.push("Failed to generate background shade for primary color")
        return {
          theme: null,
          cssVariables: {},
          report: createReport(false, errors, warnings),
        }
      }
      primaryBg = primaryBgResult

      if (accentOklch) {
        const accentBgResult = getBackgroundForColor(
          accentOklch,
          shouldUseDarkMode,
          accentAnchorShade
        )
        if (accentBgResult) {
          accentBg = accentBgResult
        } else {
          warnings.push("Failed to generate background shade for accent color")
        }
      }

      const defaultBgResult = getBackgroundForColor(
        DEFAULT_OKLCH,
        shouldUseDarkMode,
        500
      )
      if (!defaultBgResult) {
        errors.push("Failed to generate background shade for default color")
        return {
          theme: null,
          cssVariables: {},
          report: createReport(false, errors, warnings),
        }
      }
      defaultBg = defaultBgResult
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      errors.push(`Shade generation error: ${errorMsg}`)
      return {
        theme: null,
        cssVariables: {},
        report: createReport(false, errors, warnings),
      }
    }

    const primaryBgCss = oklchToCss(primaryBg)
    const accentBgCss = accentBg ? oklchToCss(accentBg) : undefined
    const defaultBgCss = oklchToCss(defaultBg)
    const primaryFg = getAccessibleForeground(primaryBgCss)
    const accentFg = accentBgCss
      ? getAccessibleForeground(accentBgCss)
      : undefined
    const defaultFg = getAccessibleForeground(defaultBgCss)

    // Typography is a passthrough: unlike colors, font names/scale/radius
    // don't need shade generation or contrast derivation.
    const typography: ResolvedThemeTypography | undefined =
      headingFont !== undefined ||
      bodyFont !== undefined ||
      monoFont !== undefined ||
      fontScale !== undefined ||
      borderRadius !== undefined
        ? { headingFont, bodyFont, monoFont, fontScale, borderRadius }
        : undefined

    // Build resolved theme
    const resolvedTheme: ResolvedTheme = {
      isDarkMode: shouldUseDarkMode,
      colors: {
        primary,
        ...(customAccent && accentOklch ? { accent } : {}),
        ...(harmony ? { harmony } : {}),
      },
      ...(typography ? { typography } : {}),
    }

    // Generate shade scales and compile to CSS variables
    const cssVariables: CssVariables = {}

    // Define all palettes (primary is always included, accent only if valid)
    type Palette = {
      name: string
      oklch: Oklch
      baseColor: string
      foreground: string
      background: string
      anchorShade: ShadeStep
    }

    const palettes: Palette[] = [
      {
        name: "primary",
        oklch: primaryOklch,
        baseColor: primaryBgCss,
        foreground: primaryFg,
        background: primaryBgCss,
        anchorShade: primaryAnchorShade,
      },
      ...(accentOklch && accentBgCss
        ? [
            {
              name: "accent",
              oklch: accentOklch,
              baseColor: accentBgCss,
              foreground: accentFg!,
              background: accentBgCss,
              anchorShade: accentAnchorShade,
            },
          ]
        : []),
      {
        name: "default",
        oklch: DEFAULT_OKLCH,
        baseColor: defaultBgCss,
        foreground: defaultFg,
        background: defaultBgCss,
        anchorShade: 500,
      },
    ]

    const generatedPalettes = new Map<
      string,
      ReturnType<typeof generatePaletteScale>
    >()

    // Compile each palette to legacy compatibility variables. Runtime
    // design-system variables are emitted from the same generated scales below.
    for (const palette of palettes) {
      const shades = generatePaletteScale({
        color: palette.oklch,
        anchorShade: palette.anchorShade,
        mode: shouldUseDarkMode ? "dark" : "light",
      })
      generatedPalettes.set(palette.name, shades)

      // Base color and foreground
      cssVariables[`--color-${palette.name}`] = palette.baseColor
      cssVariables[`--color-${palette.name}-fg`] = palette.foreground
      cssVariables[`--color-${palette.name}-bg`] = palette.background

      // Shade steps (50, 100, 200, ..., 950)
      for (const shade of shades) {
        cssVariables[`--color-${palette.name}-${shade.step}`] = shade.css
      }
    }

    // The design system owns the runtime CSS contract consumed by
    // Tailwind/shadcn. Keep Tailwind's `--color-*` namespace out of runtime
    // application: those names are compile-time aliases in `@theme inline`.
    const primaryShades = generatedPalettes.get("primary")
    if (!primaryShades) {
      throw new Error("Primary palette was not generated")
    }
    emitRuntimePalette(cssVariables, "primary", primaryShades)

    const appearance = shouldUseDarkMode ? "dark" : "light"
    const primarySemantic = getShadeCss(
      primaryShades,
      PRIMARY_SEMANTIC_STEP[appearance]
    )
    cssVariables["--ds-color-primary"] = primarySemantic
    cssVariables["--ds-color-primary-foreground"] =
      getAccessibleForeground(primarySemantic)
    cssVariables["--ds-color-ring"] = getShadeCss(
      primaryShades,
      PRIMARY_RING_STEP[appearance]
    )

    const accentShades = generatedPalettes.get("accent")
    if (accentShades) {
      emitRuntimePalette(cssVariables, "accent", accentShades)
      const accentSemantic = getShadeCss(
        accentShades,
        ACCENT_SEMANTIC_STEP[appearance]
      )
      cssVariables["--ds-color-accent"] = accentSemantic
      cssVariables["--ds-color-accent-foreground"] =
        getAccessibleForeground(accentSemantic)
    }

    // Theme mode indicator
    cssVariables["--theme-mode"] = shouldUseDarkMode ? "dark" : "light"

    // Typography and radius: passthrough CSS variables
    if (headingFont) cssVariables["--font-heading"] = headingFont
    if (bodyFont) cssVariables["--font-body"] = bodyFont
    if (monoFont) cssVariables["--font-mono"] = monoFont
    if (fontScale !== undefined)
      cssVariables["--font-scale"] = String(fontScale)
    if (borderRadius !== undefined)
      cssVariables["--radius"] = `${borderRadius}rem`

    // Phase 3: Semantic color derivation
    // Future work to add: error, warning, success, info semantic colors
    // These will be derived from accessibility requirements and provide per-mode overrides
    // See architecture guide for semantic color strategy

    return {
      theme: resolvedTheme,
      cssVariables,
      report: createReport(true, errors, warnings),
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    errors.push(`Compilation error: ${errorMsg}`)
    return {
      theme: null,
      cssVariables: {},
      report: createReport(false, errors, warnings),
    }
  }
}

function emitRuntimePalette(
  cssVariables: CssVariables,
  paletteName: "primary" | "accent",
  shades: ReturnType<typeof generatePaletteScale>
): void {
  for (const shade of shades) {
    cssVariables[`--${paletteName}-${shade.step}`] = shade.css
  }
}

function getShadeCss(
  shades: ReturnType<typeof generatePaletteScale>,
  step: number
): string {
  const shade = shades.find((candidate) => candidate.step === step)
  if (!shade) {
    throw new Error(`Generated palette is missing required shade ${step}`)
  }
  return shade.css
}

/**
 * Get background color for a given color based on mode.
 * Both appearance conventions use step 50 as their surface end: light mode
 * defines it as the lightest shade, while the currently preserved reversed
 * dark convention defines it as the darkest shade.
 *
 * @param color Base OKLCH color to derive shade from
 * @param isDarkMode Whether to generate the preserved dark ordering
 * @returns The selected shade as OKLCH color, or null if shade generation failed
 * @throws {Error} If required shade properties are missing
 */
function getBackgroundForColor(
  color: Oklch,
  isDarkMode: boolean | undefined,
  anchorShade: ShadeStep
): Oklch | null {
  const shades = generatePaletteScale({
    color,
    anchorShade,
    mode: isDarkMode ? "dark" : "light",
  })

  const targetStep = 50
  const shade = shades.find((s) => s.step === targetStep)

  if (!shade) {
    // Shade generation failed to produce required step
    return null
  }

  // Validate all required properties exist
  if (shade.l === undefined || shade.c === undefined || shade.h === undefined) {
    throw new Error(
      `Shade step ${targetStep} missing required properties: ` +
        `l=${shade.l}, c=${shade.c}, h=${shade.h}`
    )
  }

  return { l: shade.l, c: shade.c, h: shade.h }
}

/**
 * Create a compilation report with success status and diagnostic messages.
 *
 * Reports capture non-fatal issues (warnings) and blocking errors.
 * Used for debugging compilation failures and tracking degradation (e.g., missing accent).
 *
 * @param success Whether compilation succeeded without errors
 * @param errors Fatal issues that prevented full compilation
 * @param warnings Non-fatal issues (accent missing, shape generation incomplete)
 * @returns Report object with all diagnostic information
 */
function createReport(
  success: boolean,
  errors: string[],
  warnings: string[]
): ThemeCompilationReport {
  return {
    success,
    errors,
    warnings,
  }
}
