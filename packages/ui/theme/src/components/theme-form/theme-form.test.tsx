import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { ThemeForm } from "./theme-form"

describe("ThemeForm", () => {
  // it("renders its controlled tags input without requiring a form context", () => {
  //   render(<ThemeForm />)

  //   expect(screen.getByTestId("group", { name: "Name" })).toBeTruthy()
  // })

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
      name: "Dark presentation",
    })
    const darkMode = screen.getByRole("switch", { name: "Preview in dark" })

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

    await user.click(screen.getByRole("switch", { name: "Use an accent" }))
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

    await user.click(screen.getByRole("switch", { name: "Use an accent" }))
    await user.click(
      await screen.findByRole("button", { name: "Complementary 1" })
    )
    expect(screen.queryByText("No accent selected yet")).toBeNull()

    await user.click(screen.getByRole("switch", { name: "Use an accent" }))
    await user.click(screen.getByRole("switch", { name: "Use an accent" }))

    expect(screen.getByText("No accent selected yet")).toBeTruthy()
  })

  it("keeps the preview mounted and updates compiled variables live", async () => {
    const user = userEvent.setup()
    render(<ThemeForm />)

    const preview = document.querySelector<HTMLElement>("[data-theme-preview]")
    expect(preview).not.toBeNull()
    expect(preview?.style.getPropertyValue("--radius")).toBe("0.5rem")

    await user.click(screen.getByRole("radio", { name: "Large" }))

    expect(preview?.style.getPropertyValue("--radius")).toBe("1rem")
  })

  it("switches between compact editor views", async () => {
    const user = userEvent.setup()
    render(<ThemeForm />)

    const previewTab = screen.getByRole("tab", { name: "Preview" })
    await user.click(previewTab)

    expect(previewTab.getAttribute("aria-selected")).toBe("true")
    expect(screen.getByRole("tabpanel", { name: "Preview" })).toBeTruthy()
  })

  it("submits the canonical values with their compiled preview", async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    render(<ThemeForm onSave={onSave} />)

    await user.click(screen.getByRole("button", { name: "Save theme" }))

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        primaryColor: expect.stringMatching(/^oklch\(/),
      }),
      expect.objectContaining({
        theme: expect.objectContaining({ colors: expect.any(Object) }),
        cssVariables: expect.objectContaining({
          "--color-primary": expect.any(String),
        }),
      })
    )
  })
})
