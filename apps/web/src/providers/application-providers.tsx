"use client"

import { useEffect, type ReactNode } from "react"

import { PreferencesProvider } from "@repo/runtime-preferences"
import type { Preferences } from "@repo/domain-preferences"
import {
  ThemeScopeProvider,
  ThemeRegistryProvider,
  ThemeApplierProvider,
} from "@repo/runtime-theme"
import { PanelStoreProviders } from "@repo/runtime-panel"

import {
  applyAppearanceToDocument,
  BrowserThemeApplier,
} from "@repo/adapters-theme-browser"
import { DEFAULT_PRIMARY_COLOR } from "@repo/domain-theme/colors"

import { AppearanceBridge } from "./appearance-bridge"
import { useResolvedAppearance } from "../hooks/use-resolved-appearance"

import { PreferencesPersistence } from "../preferences/preferences-persistence"
import { UiApplicationProviders } from "./ui-application-providers"
import {
  AVAILABLE_THEMES,
  DEFAULT_THEME_ID,
} from "../components/theme/theme-definitions"
// import { ThemeToggleHotkey } from "@repo/ui-theme/components"
export interface ApplicationProvidersProps {
  children: ReactNode
  initialPreferences?: Partial<Preferences>
}

function RootThemeScope({ children }: { children: ReactNode }) {
  const resolvedAppearance = useResolvedAppearance()
  useEffect(() => {
    applyAppearanceToDocument(resolvedAppearance)
  }, [resolvedAppearance])
  return (
    <ThemeScopeProvider
      scopeId="root"
      overrides={{
        enableDarkMode: true,
        isDarkMode: resolvedAppearance === "dark",
        primary: DEFAULT_PRIMARY_COLOR,
      }}
    >
      {children}
    </ThemeScopeProvider>
  )
}

export function ApplicationProviders({
  children,
  initialPreferences,
}: ApplicationProvidersProps) {
  // Lazy-load localStorage only in browser to avoid SSR issues
  const _getStorage = () => {
    if (typeof window === "undefined") return undefined
    try {
      // Test if localStorage is actually available (private mode, quota exceeded, disabled, etc.)
      const test = "__storage_test__"
      window.localStorage.setItem(test, test)
      window.localStorage.removeItem(test)
      return window.localStorage
    } catch {
      // Fall back to memory-only storage if localStorage is unavailable
      return undefined
    }
  }

  return (
    <ThemeApplierProvider applier={BrowserThemeApplier}>
      <ThemeRegistryProvider
        initialThemes={AVAILABLE_THEMES}
        initialSelectedId={DEFAULT_THEME_ID}
      >
        <PreferencesProvider initialPreferences={initialPreferences}>
          <RootThemeScope>
            <UiApplicationProviders>
              <PreferencesPersistence />
              <PanelStoreProviders>
                <AppearanceBridge>{children}</AppearanceBridge>
              </PanelStoreProviders>
            </UiApplicationProviders>
          </RootThemeScope>
        </PreferencesProvider>
      </ThemeRegistryProvider>
    </ThemeApplierProvider>
  )
}
