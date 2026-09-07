"use client"

import { cn } from "@repo/ui-components/lib/utils"
import { useId } from "react"

type ChannelSliderProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  gradient: string
  suffix?: string
  precision?: number
  onChange: (value: number) => void
  compact?: boolean
}

export function ChannelSlider({
  label,
  value,
  min,
  max,
  step,
  gradient,
  suffix = "",
  precision = 3,
  onChange,
  compact = false,
}: ChannelSliderProps) {
  const id = useId()

  return (
    <div className={cn("grid", compact ? "gap-1" : "gap-2")}>
      <div className="flex items-baseline justify-between gap-3 rounded-xl">
        <label
          htmlFor={id}
          className="text-muted-foreground text-xs font-medium tracking-[0.08em] uppercase"
        >
          {label}
        </label>
        <div className="flex items-baseline gap-1 font-mono text-sm tabular-nums">
          <input
            aria-label={`${label} value`}
            type="number"
            value={round(value, precision)}
            min={min}
            max={max}
            step={step}
            onChange={(event) => {
              const next = Number.parseFloat(event.target.value)
              if (!Number.isNaN(next)) onChange(clamp(next, min, max))
            }}
            className="text-foreground focus:border-foreground w-16 [appearance:textfield] border-b border-transparent bg-transparent text-right outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded-xl"
          />
          <span className="text-muted-foreground">{suffix}</span>
        </div>
      </div>
      <div className="relative flex h-4 items-center">
        <div
          className="ring-border/70 pointer-events-none absolute inset-0 ring-1 ring-inset"
          style={{ background: gradient }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number.parseFloat(event.target.value))}
          className={cn(
            "relative z-10 h-4 w-full cursor-pointer appearance-none bg-transparent! accent-transparent",
            "[&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-transparent",
            "[&::-moz-range-track]:appearance-none [&::-moz-range-track]:bg-transparent",
            "[&::-moz-range-progress]:bg-transparent",
            "[&::-webkit-slider-thumb]:appearance-none! [&::-webkit-slider-thumb]:h-5! [&::-webkit-slider-thumb]:w-2.5! [&::-webkit-slider-thumb]:rounded-xs! [&::-webkit-slider-thumb]:border-0! [&::-webkit-slider-thumb]:bg-background",
            "[&::-moz-range-thumb]:h-5! [&::-moz-range-thumb]:w-2.5! [&::-moz-range-thumb]:rounded-xs! [&::-moz-range-thumb]:border-0! [&::-moz-range-thumb]:bg-background"
          )}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
          }}
        />
      </div>
    </div>
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function round(value: number, digits: number) {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}
