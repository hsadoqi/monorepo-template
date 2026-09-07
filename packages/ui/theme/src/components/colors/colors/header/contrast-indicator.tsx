"use client"
import {
  getContrastRatio,
  getWcagLevel,
  toCss,
} from "../../../../utils/shade-generation"
import { cn } from "@repo/ui-components/lib/utils"
import type { Oklch } from "@repo/domain-theme"
// import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui-components/base/popover"
import { EnhancedColorPicker } from "../pickers/enhanced-color-picker"
// import { TabsOklchPicker } from "../color-picker";
import { SpectrumPicker } from "../pickers/spectrum-picker"

export type ContrastIndicatorProps = {
  color: Oklch
  className?: string
  onChange?: (color: Oklch) => void
}

export function ContrastIndicator({
  color,
  className,
  onChange,
}: ContrastIndicatorProps) {
  // const [openPicker, setOpenPicker] = useState(false)
  const white: Oklch = { l: 0.97, c: 0, h: 0 }
  const black: Oklch = { l: 0.1, c: 0, h: 0 }
  const whiteContrast = getContrastRatio(white, color)
  const blackContrast = getContrastRatio(black, color)
  const bestFg = whiteContrast >= blackContrast ? white : black
  const bestRatio = Math.max(whiteContrast, blackContrast)
  const level = getWcagLevel(bestRatio)

  const levelColors: Record<string, string> = {
    AAA: "text-emerald-600 dark:text-emerald-400",
    AA: "text-blue-600 dark:text-blue-400",
    Fail: "text-red-500",
  }

  const handleChange = (color: Oklch) => {
    console.log("chosen color", color)
    return onChange ? onChange(color) : null
  }

  return (
    <Popover>
      <div
        className={cn(
          "bg-muted/50 border-border flex items-center gap-3 border pointer-events-auto size-12 w-120",
          className
        )}
      >
        <PopoverTrigger
          render={
            <button
              // onClick={(e) => {
              //   e.stopPropagation()
              //   setOpenPicker(!openPicker)
              //   console.log("open", openPicker)
              // }}
              className="border-border flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-xs font-bold shadow-sm pointer-events-auto transition-colors hover:bg-muted/70 flex-1"
              style={{ backgroundColor: toCss(color), color: toCss(bestFg) }}
            >
              Aa
            </button>
          }
        />
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground truncate font-mono text-xs">
            {toCss(color)}
          </p>
          <div className="mt-0.5 flex items-center gap-2">
            <span className={cn("text-xs font-semibold", levelColors[level])}>
              {level}
            </span>
            <span className="text-muted-foreground font-mono text-xs">
              {bestRatio.toFixed(2)}:1
            </span>
          </div>
        </div>
      </div>
      {/* {openPicker && ( */}
      <PopoverContent
        className="w-80"
        // onClick={(e .) => {
        // e.stopPropagation()
        // setOpenPicker(false)
        // }}
      >
        <SpectrumPicker
          // defaultColor={color}
          {...color}
          compact
          onChange={(color: Oklch) => handleChange(color)}
          // label="Select color"
          // showContrast={false}
        />
      </PopoverContent>
      {/* )} */}
    </Popover>
  )
}

export const PopoverPicker = ({
  color,
  onChange,
}: {
  color: Oklch
  onChange: (color: Oklch) => void
}) => {
  return (
    <PopoverContent className="w-100">
      <EnhancedColorPicker
        color={color}
        onChange={(newColor) => {
          onChange(newColor!)
        }}
        label="Select color"
        showContrast={false}
      />
    </PopoverContent>
  )
}
