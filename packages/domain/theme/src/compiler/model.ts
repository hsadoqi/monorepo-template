import { ColorHarmony, OklchString, ShadeStep } from "../colors/utils"
import { ThemeDefColors } from "../definition"

export interface ThemeCompilationInput {
  isDarkMode?: boolean
  enableDarkMode?: boolean
  customAccent?: boolean
  primary: OklchString
  /** Shade occupied by the authored primary seed. Defaults to 500. */
  primaryAnchorShade?: ShadeStep
  accent?: OklchString
  /** Shade occupied by the authored accent seed. Defaults to 500. */
  accentAnchorShade?: ShadeStep
  harmony?: ColorHarmony
  headingFont?: string
  bodyFont?: string
  monoFont?: string
  /** Multiplier applied to the base type scale, e.g. 1 = 100%. */
  fontScale?: number
  /** Base corner radius in rem. */
  borderRadius?: number
}

export interface ResolvedThemeTypography {
  headingFont?: string
  bodyFont?: string
  monoFont?: string
  fontScale?: number
  borderRadius?: number
}

export interface ResolvedTheme {
  isDarkMode?: boolean
  colors: ThemeDefColors
  typography?: ResolvedThemeTypography
}

export interface CssVariables {
  [key: string]: string
}

export interface ThemeCompilationReport {
  success: boolean
  errors: string[]
  warnings: string[]
}

export interface ThemeCompilationResult {
  theme: ResolvedTheme | null
  cssVariables: CssVariables
  report: ThemeCompilationReport
}
