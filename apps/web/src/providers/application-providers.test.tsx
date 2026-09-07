import { act, render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import {
  createMatchMediaMock,
  installBrowserMocks,
} from "@repo/foundation-test-mocks/browser"
import { useThemeScope } from "@repo/runtime-theme"

import { ApplicationProviders } from "./application-providers"

installBrowserMocks()

const { matchMedia: mockMatchMedia, fireChange } = createMatchMediaMock(false)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: mockMatchMedia,
})

function RootAppearanceProbe() {
  const { isDarkMode } = useThemeScope()
  return <output data-testid="root-dark-mode">{String(isDarkMode)}</output>
}

/**
 * Integration coverage for the composition root's provider wiring
 * (ThemeApplierProvider + RootThemeScope's initial seed + AppearanceBridge's
 * live sync effect). Exists specifically to catch a regression of the bug
 * fixed in this session: under the default "system" appearance preference,
 * an OS-level prefers-color-scheme change silently failed to reach the root
 * scope's actual dark-mode state, because the old sync path wrote into a
 * `overrides` prop that ThemeScopeProvider only reads once, on mount.
 */
describe("ApplicationProviders composition root", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    )
  })

  it("keeps the root scope's dark mode in sync with OS-level appearance changes under the default system preference", async () => {
    render(
      <ApplicationProviders>
        <RootAppearanceProbe />
      </ApplicationProviders>
    )

    await waitFor(() => {
      expect(screen.getByTestId("root-dark-mode").textContent).toBe("false")
    })

    act(() => {
      fireChange(true)
    })

    await waitFor(() => {
      expect(screen.getByTestId("root-dark-mode").textContent).toBe("true")
    })
  })
})
