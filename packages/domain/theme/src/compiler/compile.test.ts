import { describe, it, expect } from "vitest"
import { compile } from "./compile"
import type { ThemeCompilationInput } from "./model"
import {
  fitToGamut,
  oklchToCss,
  renderedContrastRatio,
  toOklch,
} from "../colors"

const SHADE_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const

describe("compile()", () => {
  const primaryColor = "oklch(55% 0.15 200)"

  describe("determinism", () => {
    it("produces identical output for identical inputs", () => {
      const input: ThemeCompilationInput = {
        primary: primaryColor,
      }

      const result1 = compile(input)
      const result2 = compile(input)

      expect(result1.cssVariables).toEqual(result2.cssVariables)
      expect(result1.theme).toEqual(result2.theme)
      expect(result1.report).toEqual(result2.report)
    })
  })

  describe("required and optional inputs", () => {
    it("compiles with primary color only", () => {
      const input: ThemeCompilationInput = {
        primary: primaryColor,
      }

      const result = compile(input)

      expect(result.report.success).toBe(true)
      expect(result.cssVariables["--color-primary"]).toBeDefined()
      expect(result.cssVariables["--color-primary-fg"]).toBeDefined()
      expect(result.theme?.colors.primary).toBe(primaryColor)
    })

    it("compiles with primary and accent when customAccent is true", () => {
      const accentColor = "oklch(60% 0.12 30)"
      const input: ThemeCompilationInput = {
        primary: primaryColor,
        accent: accentColor,
        customAccent: true,
      }

      const result = compile(input)

      expect(result.report.success).toBe(true)
      expect(result.cssVariables["--color-accent"]).toBeDefined()
      expect(result.cssVariables["--color-accent-fg"]).toBeDefined()
      expect(result.theme?.colors.accent).toBe(accentColor)
    })

    it("ignores accent when customAccent is false or undefined", () => {
      const accentColor = "oklch(60% 0.12 30)"
      const input: ThemeCompilationInput = {
        primary: primaryColor,
        accent: accentColor,
        customAccent: false,
      }

      const result = compile(input)

      expect(result.theme?.colors.accent).toBeUndefined()
      expect(result.cssVariables["--color-accent"]).toBeUndefined()
    })
  })

  describe("dark mode", () => {
    it("tracks isDarkMode in resolved theme", () => {
      const input: ThemeCompilationInput = {
        primary: primaryColor,
        isDarkMode: true,
        enableDarkMode: true,
      }

      const result = compile(input)

      expect(result.theme?.isDarkMode).toBe(true)
    })

    it("keeps the legacy dark background alias on the dark end of the reversed scale", () => {
      const result = compile({
        primary: primaryColor,
        isDarkMode: true,
        enableDarkMode: true,
      })

      expect(result.cssVariables["--color-primary"]).toBe(
        result.cssVariables["--primary-50"]
      )
    })
  })

  describe("harmony", () => {
    it("stores harmony preference in resolved theme", () => {
      const input: ThemeCompilationInput = {
        primary: primaryColor,
        customAccent: true,
        accent: "oklch(60% 0.12 30)",
        harmony: "complementary",
      }

      const result = compile(input)

      expect(result.theme?.colors.harmony).toBe("complementary")
    })
  })

  describe("typography", () => {
    it("passes through font family and scale as CSS variables", () => {
      const input: ThemeCompilationInput = {
        primary: primaryColor,
        headingFont: "Playfair Display",
        bodyFont: "Inter",
        monoFont: "Fira Code",
        fontScale: 1.1,
      }

      const result = compile(input)

      expect(result.cssVariables["--font-heading"]).toBe("Playfair Display")
      expect(result.cssVariables["--font-body"]).toBe("Inter")
      expect(result.cssVariables["--font-mono"]).toBe("Fira Code")
      expect(result.cssVariables["--font-scale"]).toBe("1.1")
      expect(result.theme?.typography).toEqual({
        headingFont: "Playfair Display",
        bodyFont: "Inter",
        monoFont: "Fira Code",
        fontScale: 1.1,
        borderRadius: undefined,
      })
    })

    it("compiles border radius as a rem value", () => {
      const input: ThemeCompilationInput = {
        primary: primaryColor,
        borderRadius: 0.5,
      }

      const result = compile(input)

      expect(result.cssVariables["--radius"]).toBe("0.5rem")
    })

    it("omits typography from the resolved theme when none is provided", () => {
      const input: ThemeCompilationInput = {
        primary: primaryColor,
      }

      const result = compile(input)

      expect(result.theme?.typography).toBeUndefined()
      expect(result.cssVariables["--font-heading"]).toBeUndefined()
      expect(result.cssVariables["--radius"]).toBeUndefined()
    })
  })

  describe("CSS variable generation", () => {
    it("defaults the authored primary seed to shade 500", () => {
      const result = compile({ primary: primaryColor })

      expect(result.cssVariables["--primary-500"]).toBe(
        oklchToCss(fitToGamut(toOklch(primaryColor)))
      )
    })

    it("preserves an explicit primary anchor", () => {
      const result = compile({
        primary: primaryColor,
        primaryAnchorShade: 700,
      })

      expect(result.cssVariables["--primary-700"]).toBe(
        oklchToCss(fitToGamut(toOklch(primaryColor)))
      )
    })

    it("preserves an explicit accent anchor", () => {
      const accentColor = "oklch(60% 0.12 30)"
      const result = compile({
        primary: primaryColor,
        accent: accentColor,
        customAccent: true,
        accentAnchorShade: 300,
      })

      expect(result.cssVariables["--accent-300"]).toBe(
        oklchToCss(fitToGamut(toOklch(accentColor)))
      )
    })

    it("emits the design-system runtime primary scale", () => {
      const result = compile({ primary: primaryColor })

      for (const step of SHADE_STEPS) {
        expect(result.cssVariables[`--primary-${step}`]).toMatch(
          /^oklch\(.*\)$/
        )
      }
    })

    it("resolves light primary semantics and ring from the emitted scale", () => {
      const result = compile({ primary: primaryColor, isDarkMode: false })

      expect(result.cssVariables["--ds-color-primary"]).toBe(
        result.cssVariables["--primary-700"]
      )
      expect(result.cssVariables["--ds-color-ring"]).toBe(
        result.cssVariables["--primary-600"]
      )
      expect(
        renderedContrastRatio(
          result.cssVariables["--ds-color-primary-foreground"]!,
          result.cssVariables["--ds-color-primary"]!
        )
      ).toBeGreaterThanOrEqual(4.5)
    })

    it("resolves dark primary semantics and ring from the emitted scale", () => {
      const result = compile({
        primary: primaryColor,
        enableDarkMode: true,
        isDarkMode: true,
      })

      expect(result.cssVariables["--ds-color-primary"]).toBe(
        result.cssVariables["--primary-300"]
      )
      expect(result.cssVariables["--ds-color-ring"]).toBe(
        result.cssVariables["--primary-400"]
      )
      expect(
        renderedContrastRatio(
          result.cssVariables["--ds-color-primary-foreground"]!,
          result.cssVariables["--ds-color-primary"]!
        )
      ).toBeGreaterThanOrEqual(4.5)
    })

    it("emits a custom accent scale and accessible semantic pair", () => {
      const result = compile({
        primary: primaryColor,
        accent: "oklch(60% 0.12 30)",
        customAccent: true,
      })

      for (const step of SHADE_STEPS) {
        expect(result.cssVariables[`--accent-${step}`]).toMatch(/^oklch\(.*\)$/)
      }
      expect(result.cssVariables["--ds-color-accent"]).toBe(
        result.cssVariables["--accent-100"]
      )
      expect(
        renderedContrastRatio(
          result.cssVariables["--ds-color-accent-foreground"]!,
          result.cssVariables["--ds-color-accent"]!
        )
      ).toBeGreaterThanOrEqual(4.5)
    })

    it("inherits the design-system accent contract when custom accent is disabled", () => {
      const result = compile({
        primary: primaryColor,
        accent: "oklch(60% 0.12 30)",
        customAccent: false,
      })

      for (const step of SHADE_STEPS) {
        expect(result.cssVariables[`--accent-${step}`]).toBeUndefined()
      }
      expect(result.cssVariables["--ds-color-accent"]).toBeUndefined()
      expect(
        result.cssVariables["--ds-color-accent-foreground"]
      ).toBeUndefined()
    })

    it("inherits the design-system accent contract when a custom accent is invalid", () => {
      const result = compile({
        primary: primaryColor,
        accent: "not-a-color" as ThemeCompilationInput["accent"],
        customAccent: true,
      })

      expect(result.report.success).toBe(true)
      expect(result.report.warnings).toHaveLength(1)
      expect(result.cssVariables["--accent-500"]).toBeUndefined()
      expect(result.cssVariables["--ds-color-accent"]).toBeUndefined()
      expect(
        result.cssVariables["--ds-color-accent-foreground"]
      ).toBeUndefined()
    })

    it("generates base color variables in oklch() format", () => {
      const input: ThemeCompilationInput = {
        primary: primaryColor,
      }

      const result = compile(input)

      expect(result.cssVariables["--color-primary"]).toMatch(/^oklch\(.*\)$/)
      expect(result.cssVariables["--color-primary-fg"]).toMatch(/^oklch\(.*\)$/)
      expect(result.cssVariables["--color-default"]).toMatch(/^oklch\(.*\)$/)
    })

    it("generates shade scales", () => {
      const input: ThemeCompilationInput = {
        primary: primaryColor,
      }

      const result = compile(input)

      const primaryShades = Object.keys(result.cssVariables).filter(
        (key) => key.startsWith("--color-primary-") && !key.includes("fg")
      )

      expect(primaryShades.length).toBeGreaterThan(0)
    })

    it("generates default shades", () => {
      const input: ThemeCompilationInput = {
        primary: primaryColor,
      }

      const result = compile(input)

      const defaultShades = Object.keys(result.cssVariables).filter((key) =>
        key.startsWith("--color-default-")
      )

      expect(defaultShades.length).toBeGreaterThan(0)
    })
  })

  describe("error handling", () => {
    it("returns success=true for valid input", () => {
      const input: ThemeCompilationInput = {
        primary: primaryColor,
      }

      const result = compile(input)

      expect(result.report.success).toBe(true)
      expect(result.report.errors).toHaveLength(0)
    })
  })
})
