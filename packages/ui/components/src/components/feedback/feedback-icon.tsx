import {
  CheckCircle2,
  CircleAlert,
  Inbox,
  Info,
  LoaderCircle,
  SearchX,
  ShieldAlert,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react"

import { cn } from "../../lib/utils"
import type { FeedbackKind } from "./feedback-types"

const icons: Record<FeedbackKind, LucideIcon> = {
  loading: LoaderCircle,
  success: CheckCircle2,
  error: CircleAlert,
  warning: TriangleAlert,
  info: Info,
  empty: Inbox,
  "not-found": SearchX,
  forbidden: ShieldAlert,
}

export function FeedbackIcon({
  kind,
  className,
}: {
  kind: FeedbackKind
  className?: string
}) {
  const Icon = icons[kind]

  return (
    <Icon
      aria-hidden="true"
      className={cn(
        kind === "loading" &&
          "animate-spin motion-reduce:animate-none motion-reduce:opacity-70",
        className
      )}
    />
  )
}
