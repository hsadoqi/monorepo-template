import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { ThemeForm } from "./theme-form"

describe("ThemeForm", () => {
  it("renders its controlled tags input without requiring a form context", () => {
    render(<ThemeForm />)

    expect(screen.getByRole("textbox", { name: "Name" })).toBeTruthy()
  })

  it("confirms when the primary color value has been copied", async () => {
    const user = userEvent.setup()
    render(<ThemeForm />)

    const copyButton = screen.getByRole("button", {
      name: /oklch\(/i,
    })
    const clipboardWrite = vi.spyOn(navigator.clipboard, "writeText")

    await user.click(copyButton)

    expect(clipboardWrite).toHaveBeenCalledWith(
      expect.stringMatching(/^oklch\(/)
    )
    expect(screen.getByText("Copied!")).toBeTruthy()
  })

  it("enables and controls the dark-mode value", async () => {
    const user = userEvent.setup()
    render(<ThemeForm />)

    const enableDarkMode = screen.getByRole("switch", {
      name: "Enable Dark Mode",
    })
    const darkMode = screen.getByRole("switch", { name: "Dark Mode" })

    expect(darkMode.getAttribute("aria-disabled")).toBe("true")

    await user.click(enableDarkMode)
    await user.click(darkMode)

    expect(darkMode.hasAttribute("aria-disabled")).toBe(false)
    expect(darkMode.getAttribute("aria-checked")).toBe("true")
  })

  it("sets the accent color from a harmony swatch once custom accent is enabled", async () => {
    const user = userEvent.setup()
    render(<ThemeForm />)

    const primaryColorText = screen.getByRole("button", {
      name: /oklch\(/i,
    }).textContent

    expect(screen.queryByText("No accent selected yet")).toBeNull()

    await user.click(
      screen.getByRole("switch", { name: "Add Custom Accent Color" })
    )
    expect(screen.getByText("No accent selected yet")).toBeTruthy()

    await user.click(
      await screen.findByRole("button", { name: "Complementary 1" })
    )

    expect(screen.queryByText("No accent selected yet")).toBeNull()
    expect(screen.getByRole("button", { name: /oklch\(/i }).textContent).toBe(
      primaryColorText
    )
  })

  it("clears the accent color when custom accent is disabled", async () => {
    const user = userEvent.setup()
    render(<ThemeForm />)

    await user.click(
      screen.getByRole("switch", { name: "Add Custom Accent Color" })
    )
    await user.click(
      await screen.findByRole("button", { name: "Complementary 1" })
    )
    expect(screen.queryByText("No accent selected yet")).toBeNull()

    await user.click(
      screen.getByRole("switch", { name: "Add Custom Accent Color" })
    )
    await user.click(
      screen.getByRole("switch", { name: "Add Custom Accent Color" })
    )

    expect(screen.getByText("No accent selected yet")).toBeTruthy()
  })
})
