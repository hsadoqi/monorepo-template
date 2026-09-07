import { CheckIcon, ClipboardIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui-components/base/tooltip"
import { CopyButton } from "@repo/ui-components/buttons/copy-value"
import { deriveScaleCss, SCALE_STEPS, ScaleStep } from "@/utils/shade-generation"
import { getIconForeground, type Oklch } from "@repo/domain-theme"

export type ColorPreviewStripProps = {
  colors: Oklch[]
  mode: "light" | "dark"
}

/**
 * Renders the derived 11-step scale for the first supplied color.
 *
 * Takes `Oklch` objects rather than CSS strings: the strip previously accepted
 * strings and re-parsed them, which round-tripped every color through a
 * serializer and a parser for no gain.
 */
export function ColorPreviewStrip({ colors, mode }: ColorPreviewStripProps) {
  const [base] = colors

  if (!base) {
    return (
      <div className="text-muted-foreground text-sm">
        No valid colors provided.
      </div>
    )
  }

  // `deriveScaleCss` returns CSS strings; `deriveScale` returns Oklch objects
  // that would stringify to "[object Object]" if used as a style value.
  const scale = deriveScaleCss(base, mode)

  return (
    <div className="flex h-6 gap-0.5 overflow-hidden rounded-lg">
      {SCALE_STEPS.map((step: ScaleStep) => {
        const shade = scale[String(step)]

        return (
          <Tooltip key={step}>
            <TooltipTrigger
              render={
                <div
                  className="group/swatch relative flex-1"
                  style={{ backgroundColor: shade ?? "transparent" }}
                />
              }
            >
              {shade && (
                <CopyButton
                  value={shade}
                  label={`Copied ${shade} to clipboard`}
                  className="absolute inset-0! z-10 flex h-full w-full items-center justify-center bg-black/0 opacity-0! outline-none transition-all group-hover/swatch:bg-black/25 group-hover/swatch:opacity-100! hover:bg-black/25 focus-visible:bg-black/25 focus-visible:opacity-100! focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset active:bg-black/40! active:opacity-100!"
                  render={(copied) =>
                    copied ? (
                      <CheckIcon
                        aria-hidden
                        className="size-3.5 fill-current"
                        style={{ color: getIconForeground(shade) }}
                      />
                    ) : (
                      <ClipboardIcon
                        aria-hidden
                        className="size-3.5 fill-none transition-transform group-active/swatch:scale-90 group-active/swatch:fill-current! opacity-0 hover:opacity-100! focus-visible:opacity-100! active:opacity-100! duration-300 ease-in-out"
                        style={{ color: getIconForeground(shade) }}
                      />
                    )
                  }
                />
              )}
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="center"
              className="flex flex-col gap-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs tabular-nums">{step}</span>
                <span className="font-mono text-xs tabular-nums">
                  {shade ?? "N/A"}
                </span>
              </div>
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )
}
