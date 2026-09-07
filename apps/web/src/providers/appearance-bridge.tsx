"use client"

import { useEffect, type ReactNode } from "react"

import {
  useAppearancePreference,
  useSetAppearancePreference,
} from "@repo/runtime-preferences"

import { ThemeToggleHotkey } from "@repo/ui-theme"
import { resolveAppearance, useThemeScope } from "@repo/runtime-theme"
import { useSystemAppearance } from "@repo/adapters-theme-browser"
import type { ResolvedAppearancePreference } from "@repo/domain-preferences"

export interface AppearanceBridgeProps {
  children: ReactNode
}

/**
 * Single owner of appearance <-> root-scope-theme sync.
 *
 * The root theme scope has no independent enableDarkMode concept — it always
 * mirrors resolved appearance. This effect is the only writer to the root
 * scope's dark-mode state, covering both explicit preference changes and
 * automatic OS-level appearance changes (when preference is "system").
 */
export function AppearanceBridge({ children }: AppearanceBridgeProps) {
  const preference = useAppearancePreference()
  const systemAppearance = useSystemAppearance()
  const resolvedPreference = resolveAppearance(preference, systemAppearance)
  const setPreference = useSetAppearancePreference()
  const { setDarkMode } = useThemeScope()

  useEffect(() => {
    setDarkMode(resolvedPreference === "dark")
  }, [resolvedPreference, setDarkMode])

  const handleAppearanceChange = (next: ResolvedAppearancePreference) => {
    setPreference(next)
  }

  // Keep the root scope's dark mode reacting to the resolved preference.
  // The scope store initializes its dark mode once at mount (from the initial
  // overrides, before system appearance has resolved), so without this the
  // scope stays stuck on that first value while the resolved preference and
  // <html> move on — leaving the scope and document themes disagreeing.
  // useEffect(() => {
  //   setDarkMode(resolvedPreference === "dark")
  //   setGlobalThemeDarkMode(resolvedPreference === "dark")
  // }, [resolvedPreference, setDarkMode, setGlobalThemeDarkMode])

  return (
    <>
      <ThemeToggleHotkey
        resolvedAppearance={resolvedPreference}
        onAppearanceChange={handleAppearanceChange}
      />
      {children}
    </>
  )
}
