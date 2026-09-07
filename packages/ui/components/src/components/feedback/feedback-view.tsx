import type { ComponentProps } from "react"

import { cn } from "../../lib/utils"
import { FeedbackIcon } from "./feedback-icon"
import type { FeedbackContentProps } from "./feedback-types"

export interface FeedbackViewProps
  extends FeedbackContentProps, Omit<ComponentProps<"section">, "title"> {
  placement?: "section" | "page"
}

export function FeedbackView({
  kind,
  title,
  description,
  action,
  secondaryAction,
  placement = "section",
  className,
  ...props
}: FeedbackViewProps) {
  const isPage = placement === "page"
  const isLoading = kind === "loading"
  const isDynamicError = kind === "error" || kind === "warning"
  const isPolite = isLoading || kind === "success" || kind === "info"
  const role = isDynamicError ? "alert" : isPolite ? "status" : undefined
  const Heading = isPage ? "h1" : "h2"

  return (
    <section
      data-slot="feedback-view"
      data-kind={kind}
      data-placement={placement}
      role={role}
      aria-live={role ? (isDynamicError ? "assertive" : "polite") : undefined}
      aria-atomic={role ? "true" : undefined}
      aria-busy={isLoading || undefined}
      className={cn(
        "flex w-full flex-col items-center justify-center text-center",
        isPage
          ? "mx-auto min-h-[calc(100svh-3.5rem)] max-w-xl px-4 py-16 sm:px-6"
          : "min-h-64 rounded-xl border border-border bg-card px-6 py-12",
        className
      )}
      {...props}
    >
      <div className="bg-muted text-muted-foreground mb-5 flex size-11 items-center justify-center rounded-full">
        <FeedbackIcon kind={kind} className="size-5" />
      </div>
      <Heading className="font-heading text-xl font-semibold tracking-tight">
        {title}
      </Heading>
      {description ? (
        <div className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
          {description}
        </div>
      ) : null}
      {action || secondaryAction ? (
        <div className="mt-6 flex flex-col-reverse items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
          {secondaryAction}
          {action}
        </div>
      ) : null}
    </section>
  )
}
