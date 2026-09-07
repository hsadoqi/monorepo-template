"use client"

import {
  getPaletteTokenForeground,
  oklchToCss,
  type Shade,
} from "@repo/domain-theme"
import { cn } from "@repo/ui-components/lib/index"
import { CopyButton } from "@repo/ui-components/buttons/copy-value"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui-components/base/tooltip"
import { autoForeground } from "../../../../utils/shade-generation"

export type ShadeRampProps = {
  shades: Shade[]
  orientation?: "horizontal" | "vertical"
}

export function ShadeRamp({
  shades,
  orientation = "vertical",
}: ShadeRampProps) {
  const cssShades = shades.map((shade) => shade.css)

  return (
    <div className="grid gap-3 @container/wrapper]">
      <div
        className={cn(
          orientation === "horizontal"
            ? "flex gap-2"
            : "flex flex-col gap-2 @sm/wrapper:grid-cols-6 @2xl:grid-cols-11"
        )}
      >
        {shades.map((shade) => (
          <Tooltip key={shade.step}>
            <TooltipTrigger
              render={
                <div
                  className={cn(
                    "border-border/70 relative h-20 cursor-pointer rounded-sm border transition hover:opacity-70 active:opacity-50",
                    orientation === "horizontal" && "min-w-0 flex-1"
                  )}
                />
              }
            >
              <CopyButton
                value={shade.hex}
                label={`Copied ${shade.hex} to clipboard`}
                className="focus-visible:ring-ring focus-visible:outline-ring absolute inset-0 z-10 h-full w-full rounded-sm focus-visible:ring-[3px] focus-visible:outline-1"
                style={{
                  color: getPaletteTokenForeground(shade.css, cssShades),
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-[3px]"
                  style={{
                    backgroundColor: shade.hex,
                    color: oklchToCss(autoForeground(shade)),
                  }}
                />
              </CopyButton>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-mono text-xs tabular-nums">
                {shade.step} · {shade.hex}
              </span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

const _CopyClipboard = ({ value }: { value: string }) => {
  return (
    <CopyButton
      value={value}
      label={`Copied ${value} to clipboard`}
      className="border-border/70 focus-visible:ring-ring focus-visible:outline-ring absolute inset-0 z-10 grid h-full w-full cursor-pointer items-center justify-center rounded-sm border text-center text-xs font-medium tracking-[0.08em] transition hover:opacity-70 focus-visible:ring-[3px] focus-visible:outline-1 active:opacity-50"
    >
      <span className="font-mono text-[10px] tabular-nums">{value}</span>
    </CopyButton>
  )
}
