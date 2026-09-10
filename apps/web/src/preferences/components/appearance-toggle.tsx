"use client"

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { useSetAppearancePreference } from "@repo/runtime-preferences"
import { IconButton } from "@repo/ui-components"

import { useResolvedAppearance } from "@/hooks/use-resolved-appearance"

/**
 * Icon button that flips the whole application between light and dark.
 *
 * It only writes the appearance preference; AppearanceBridge reacts to the
 * resolved preference and keeps the root scope, global theme, and <html> in
 * sync, so the change applies dynamically across the app.
 */
export function AppearanceToggle() {
  const resolvedAppearance = useResolvedAppearance()
  const setPreference = useSetAppearancePreference()
  const isDark = resolvedAppearance === "dark"

  return (
    <IconButton
      type="button"
      variant="outline"
      size="icon-sm"
      aria-pressed={isDark}
      label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setPreference(isDark ? "light" : "dark")}
    >
      <HugeiconsIcon icon={isDark ? Sun03Icon : Moon02Icon} />
    </IconButton>
  )
}
