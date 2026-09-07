import type { ComponentProps, ReactNode } from "react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "../../base/ui/alert"
import { cn } from "../../lib/utils"
import { FeedbackIcon } from "./feedback-icon"
import type { FeedbackLiveKind } from "./feedback-types"

export interface FeedbackAlertProps extends Omit<
  ComponentProps<typeof Alert>,
  "title"
> {
  kind: FeedbackLiveKind
  title: ReactNode
  action?: ReactNode
}

export function FeedbackAlert({
  kind,
  title,
  children,
  action,
  className,
  ...props
}: FeedbackAlertProps) {
  const isAssertive = kind === "error" || kind === "warning"

  return (
    <Alert
      data-slot="feedback-alert"
      data-kind={kind}
      role={isAssertive ? "alert" : "status"}
      aria-live={isAssertive ? "assertive" : "polite"}
      aria-atomic="true"
      aria-busy={kind === "loading" || undefined}
      variant={kind === "error" ? "destructive" : "default"}
      className={cn("px-3 py-2.5", className)}
      {...props}
    >
      <FeedbackIcon kind={kind} />
      <AlertTitle>{title}</AlertTitle>
      {children ? <AlertDescription>{children}</AlertDescription> : null}
      {action ? <AlertAction>{action}</AlertAction> : null}
    </Alert>
  )
}
