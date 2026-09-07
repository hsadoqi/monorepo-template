"use client"

import type { Oklch } from "@repo/domain-theme"
import { cn } from "@repo/ui-components/lib/index"
import {
  HUE_PRESETS,
  autoForeground,
  toCss,
} from "../../../../utils/shade-generation"

export type HuePresetGridProps = {
  color: Oklch
  onColorSelect: (color: Oklch) => void
  label?: string
  categories?: string[]
  swatches?: (Oklch & { category: string; name: string })[]
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const swatchSize = {
  xs: "h-5 w-5",
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11",
  xl: "h-12 w-12",
}

export function HuePresetGrid({
  color: primary,
  onColorSelect,
  categories = ["Warm", "Cool", "Purple", "Neutral"],
  swatches = HUE_PRESETS,
  label,
  size = "sm",
}: HuePresetGridProps) {
  return (
    <div className="space-y-3">
      {label && (
        <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          {label || "Quick Presets"}
        </span>
      )}
      {categories.map((cat) => {
        const presets = swatches.filter((p) => p.category === cat)
        if (!presets.length) return null
        return (
          <div key={cat}>
            <p className="text-muted-foreground mb-1.5 text-[10px]">{cat}</p>
            <div className="flex w-full flex-row items-center justify-evenly gap-1.5">
              {presets.map(
                (preset: Oklch & { category: string; name: string }) => {
                  const isActive =
                    Math.abs(primary.h - preset.h) < 3 &&
                    Math.abs(primary.c - preset.c) < 0.02
                  const bg = toCss({ h: preset.h, c: preset.c, l: preset.l })
                  const fg = toCss(
                    autoForeground({ h: preset.h, c: preset.c, l: preset.l })
                  )
                  return (
                    <button
                      type="button"
                      key={preset.name}
                      onClick={() => onColorSelect(preset)}
                      title={`${preset.name}: H${preset.h}° C${preset.c}`}
                      className={cn(
                        "rounded-md border-2 transition-all size-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                        isActive
                          ? "border-foreground scale-110 shadow-md"
                          : "hover:border-foreground/40 border-transparent hover:scale-105",
                        swatchSize[size as keyof typeof swatchSize]
                      )}
                      style={{ backgroundColor: bg, color: fg }}
                      aria-label={preset.name}
                      aria-pressed={isActive}
                    />
                  )
                }
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
