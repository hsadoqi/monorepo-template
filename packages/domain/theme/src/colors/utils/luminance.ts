import {
  transformOklchToLMS,
  transformLMStoRgb,
  calculateLuminanceFromRgb,
} from "./transforms"
import { fitToGamut } from "./gamut"
import { parseOklch, assertOklch, parseOklchString } from "./parse"
import type { OklchComponents } from "./core-model"

/**
 * Calculates relative luminance from the raw OKLCH transform. This compatibility
 * API does not gamut-fit first; use `renderedLuminance()` for accessibility
 * decisions that must describe the sRGB color shown on screen.
 * @param value - OKLch color string (e.g., "oklch(50% 0.2 120)")
 * @returns Luminance value (0-1) where 0=black, 1=white
 * @throws Error if the color string is not valid OKLch format
 * @example
 *   luminance("oklch(100% 0 0)")   // => 1 (white)
 *   luminance("oklch(0% 0 0)")     // => 0 (black)
 *   luminance("oklch(50% 0.1 60)") // => ~0.18
 */
export function luminance(value: string): number {
  const oklchColor = assertOklch(value)
  return luminanceFromOklch(oklchColor)
}

/**
 * Calculates raw luminance from already-parsed OKLCH components. Useful for
 * color-science operations; accessibility callers should gamut-fit first or use
 * `renderedLuminance()`.
 * @param oklch - Parsed OKLch color components
 * @returns Luminance value (0-1)
 */
export function luminanceFromOklch(oklch: OklchComponents): number {
  const lms = transformOklchToLMS(oklch)
  const rgb = transformLMStoRgb(lms)
  return calculateLuminanceFromRgb(rgb)
}

/**
 * Safely calculates luminance, returning null if the color is invalid.
 * Use when you want to handle invalid colors gracefully without throwing.
 * @param value - OKLch color string
 * @returns Luminance (0-1) or null if parsing fails
 * @example
 *   tryLuminance("oklch(50% 0.2 120)") // => 0.42
 *   tryLuminance("invalid") // => null
 */
export function tryLuminance(value: string): number | null {
  const oklchColor = parseOklch(value)
  return oklchColor ? luminanceFromOklch(oklchColor) : null
}

/**
 * Calculate WCAG relative luminance from the color that can actually be
 * rendered in sRGB. Unlike `luminance()`, this applies the canonical
 * chroma-reduction gamut policy before transforming to linear RGB.
 */
export function renderedLuminance(value: string): number {
  const parsed = parseOklchString(value)
  if (!parsed) {
    throw new Error(
      `Invalid OKLch color. Expected format: oklch(L C H) or oklch(L% C H)`
    )
  }

  const fitted = fitToGamut(parsed)
  return luminanceFromOklch({
    lightness: fitted.l,
    chroma: fitted.c,
    hue: (fitted.h * Math.PI) / 180,
  })
}

/** Safe rendered-luminance variant for validation and search paths. */
export function tryRenderedLuminance(value: string): number | null {
  try {
    return renderedLuminance(value)
  } catch {
    return null
  }
}
