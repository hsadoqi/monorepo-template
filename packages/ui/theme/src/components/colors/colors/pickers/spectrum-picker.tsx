"use client"

import {
  MAX_CHROMA,
  Oklch,
  clampC,
  clampL,
  oklchToCss,
  oklchToHex,
} from "@repo/domain-theme"
import { useCallback, useMemo, useRef } from "react"

type SpectrumPickerProps = {
  l: number
  c: number
  h: number
  onChange: ({ l, h, c }: Oklch) => void
  compact?: boolean
}

/**
 * A 2D chroma x lightness plane rendered at the current hue. Chroma runs
 * left to right, lightness runs bottom to top. Click or drag to select.
 *
 * The plane is a layered CSS gradient (hue color, lightened toward white on
 * the left, darkened toward black at the bottom) rather than a canvas pixel
 * grid: it paints synchronously with layout, so it can't go blank when
 * mounted inside a popover/portal whose open animation delays an imperative
 * draw effect. It's a visual approximation, not a per-pixel OKLCH
 * interpolation — the actual selected value on click/drag is still computed
 * exactly from clampL/clampC.
 */
export function SpectrumPicker({
  l,
  c,
  h,
  onChange,
  compact = false,
}: SpectrumPickerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const planeBackground = useMemo(
    () =>
      [
        "linear-gradient(to bottom, transparent, black)",
        "linear-gradient(to right, white, transparent)",
        oklchToCss({ l: 0.7, c: MAX_CHROMA, h }),
      ].join(", "),
    [h]
  )

  const handlePointer = useCallback(
    (clientX: number, clientY: number) => {
      const rect = wrapperRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      const y = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height))
      onChange({ l: clampL(1 - y), c: clampC(x * MAX_CHROMA), h })
    },
    [onChange, h]
  )

  const thumbHex = oklchToHex({ l, c, h })
  const thumbLeft = `${Math.min(1, Math.max(0, c / MAX_CHROMA)) * 100}%`
  const thumbTop = `${(1 - Math.min(1, Math.max(0, l))) * 100}%`

  return (
    <div
      ref={wrapperRef}
      role="slider"
      aria-valuenow={c}
      aria-label="Chroma and lightness spectrum"
      aria-valuetext={`Lightness ${l.toFixed(2)}, chroma ${c.toFixed(3)}`}
      tabIndex={0}
      className={`border-border/70 relative min-h-32 size-full touch-none overflow-hidden rounded-sm border select-none flex-1 ${compact ? "sm:h-36" : "sm:h-56 "}`}
      style={{ background: planeBackground }}
      onPointerDown={(event) => {
        event.stopPropagation()
        event.currentTarget.setPointerCapture(event.pointerId)
        draggingRef.current = true
        handlePointer(event.clientX, event.clientY)
      }}
      onPointerMove={(event) => {
        if (draggingRef.current) handlePointer(event.clientX, event.clientY)
      }}
      onPointerUp={(event) => {
        draggingRef.current = false
        event.currentTarget.releasePointerCapture(event.pointerId)
      }}
      onKeyDown={(event) => {
        event.stopPropagation()
        const step = event.shiftKey ? 0.05 : 0.01
        if (event.key === "ArrowRight")
          onChange({ l, c: clampC(c + step * MAX_CHROMA), h })
        else if (event.key === "ArrowLeft")
          onChange({ l, c: clampC(c - step * MAX_CHROMA), h })
        else if (event.key === "ArrowUp")
          onChange({ l: clampL(l + step), c, h })
        else if (event.key === "ArrowDown")
          onChange({ l: clampL(l - step), c, h })
        else return
        event.preventDefault()
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_1px_3px_rgba(0,0,0,0.4)]"
        style={{ left: thumbLeft, top: thumbTop, backgroundColor: thumbHex }}
      />
    </div>
  )
}
