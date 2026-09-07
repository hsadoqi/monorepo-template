"use client"

import { createContext, useContext, type ReactNode } from "react"

/**
 * Port for applying compiled CSS variables to a DOM element.
 * Runtime depends on this interface only; concrete DOM access lives in adapters.
 */
export interface ThemeApplier {
  applyCssToElement(
    element: HTMLElement,
    cssVariables: Record<string, string>
  ): void
}

const ThemeApplierContext = createContext<ThemeApplier | undefined>(undefined)

export function ThemeApplierProvider({
  applier,
  children,
}: {
  applier: ThemeApplier
  children: ReactNode
}) {
  return (
    <ThemeApplierContext.Provider value={applier}>
      {children}
    </ThemeApplierContext.Provider>
  )
}

export function useThemeApplier(): ThemeApplier {
  const applier = useContext(ThemeApplierContext)
  if (!applier) {
    throw new Error(
      "useThemeApplier must be used within a ThemeApplierProvider. " +
        "Wrap the app with a ThemeApplierProvider supplying a concrete ThemeApplier (e.g. BrowserThemeApplier)."
    )
  }
  return applier
}
