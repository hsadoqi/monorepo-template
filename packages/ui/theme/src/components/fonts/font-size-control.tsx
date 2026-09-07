"use client"

import { Minus, Plus } from "lucide-react"
import { FONT_SIZE_LIMITS } from "./defaults"

interface FontSizeControlProps {
  value: number
  onChange: (value: number) => void
}

export function FontSizeControl({ value, onChange }: FontSizeControlProps) {
  const handleDecrease = () => {
    const newValue = Math.max(
      FONT_SIZE_LIMITS.min,
      value - FONT_SIZE_LIMITS.step
    )
    onChange(Number(newValue.toFixed(1)))
  }

  const handleIncrease = () => {
    const newValue = Math.min(
      FONT_SIZE_LIMITS.max,
      value + FONT_SIZE_LIMITS.step
    )
    onChange(Number(newValue.toFixed(1)))
  }

  const percentage = Math.round(value * 100)

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Scale Multiplier</label>
      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrease}
          disabled={value <= FONT_SIZE_LIMITS.min}
          className="h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          aria-label="Decrease font size"
        >
          <Minus className="h-4 w-4" />
        </button>

        <div className="flex-1 text-center">
          <div className="text-lg font-semibold tabular-nums">
            {value.toFixed(1)}x
          </div>
          <div className="text-xs text-muted-foreground">{percentage}%</div>
        </div>

        <button
          onClick={handleIncrease}
          disabled={value >= FONT_SIZE_LIMITS.max}
          className="h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          aria-label="Increase font size"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>Smaller</span>
        <span>Larger</span>
      </div>
    </div>
  )
}
