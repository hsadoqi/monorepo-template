import { render, screen } from "@testing-library/react"
import { useForm } from "react-hook-form"
import { describe, expect, it } from "vitest"
import {
  fitToGamut,
  oklchToCss,
  renderedContrastRatio,
  type Oklch,
} from "@repo/domain-theme"

import { useOklchColor } from "../../hooks/use-oklch-color"
import { PrimaryColorField } from "./primary-color-field"
import type { ThemeFormValues } from "./theme-form-schema"

const RAW_COLOR: Oklch = { l: 0.52, c: 0.33, h: 175 }
const CONTRAST_BACKGROUND = "oklch(95% 0 0)"

function Subject() {
  const form = useForm<ThemeFormValues>({
    defaultValues: { isDarkMode: false },
  })
  const colorState = useOklchColor(RAW_COLOR)

  return (
    <PrimaryColorField
      control={form.control}
      colorState={colorState}
      colorResetKey={0}
    />
  )
}

describe("PrimaryColorField", () => {
  it("reports contrast for the fitted color represented by its visible swatch", () => {
    render(<Subject />)

    const fitted = fitToGamut(RAW_COLOR)
    const expected = renderedContrastRatio(
      oklchToCss(fitted),
      CONTRAST_BACKGROUND
    )

    expect(screen.getByText(`${expected.toFixed(2)}:1`)).toBeTruthy()
  })
})
