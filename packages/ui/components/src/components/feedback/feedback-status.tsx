import type { ComponentProps } from "react"

import { cn } from "../../lib/utils"
import { FeedbackIcon } from "./feedback-icon"
import type { FeedbackLiveKind } from "./feedback-types"

export interface FeedbackStatusProps extends ComponentProps<"div"> {
  kind: FeedbackLiveKind
}

export function FeedbackStatus({
  kind,
  children,
  className,
  ...props
}: FeedbackStatusProps) {
  const isAssertive = kind === "error" || kind === "warning"
  const isLoading = kind === "loading"

  return (
    <div
      data-slot="feedback-status"
      data-kind={kind}
      role={isAssertive ? "alert" : "status"}
      aria-live={isAssertive ? "assertive" : "polite"}
      aria-atomic="true"
      aria-busy={isLoading || undefined}
      className={cn(
        "text-muted-foreground inline-flex items-center gap-2 text-sm",
        isAssertive && "text-destructive",
        className
      )}
      {...props}
    >
      <FeedbackIcon kind={kind} className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  )
}
