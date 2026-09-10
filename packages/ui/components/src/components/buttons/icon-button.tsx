"use client"

import type { ComponentProps, ReactNode, Ref } from "react"
import {
  Button,
  type ButtonProps,
  type ButtonSize,
} from "@repo/ui-components/base/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui-components/base/tooltip"

const ICON_SIZES = new Set<ButtonSize>([
  "icon",
  "icon-xs",
  "icon-sm",
  "icon-lg",
])

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as { current: T | null }).current = node
    }
  }
}

type IconButtonProps = ButtonProps & {
  /** Accessible name. Used as the sr-only label, tooltip content, and aria-label fallback. */
  label: string
  children: ReactNode
  tooltipSide?: ComponentProps<typeof TooltipContent>["side"]
}

function IconButton({
  label,
  children,
  size = "icon",
  tooltipSide = "bottom",
  "aria-label": ariaLabel,
  ref,
  ...props
}: IconButtonProps) {
  const isIconOnly = ICON_SIZES.has(size)

  if (!isIconOnly) {
    return (
      <Button size={size} aria-label={ariaLabel ?? label} ref={ref} {...props}>
        {children}
      </Button>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={({ ref: triggerRef, ...triggerProps }) => (
          <Button
            size={size}
            {...triggerProps}
            {...props}
            ref={mergeRefs(triggerRef, ref)}
            aria-label={ariaLabel ?? label}
          >
            {children}
            <span className="sr-only">{label}</span>
          </Button>
        )}
      />
      <TooltipContent side={tooltipSide}>{label}</TooltipContent>
    </Tooltip>
  )
}

export { IconButton }
export type { IconButtonProps }
