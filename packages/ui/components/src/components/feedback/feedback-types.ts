import type { ReactNode } from "react"

export type FeedbackKind =
  | "loading"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "empty"
  | "not-found"
  | "forbidden"

export type FeedbackLiveKind = Extract<
  FeedbackKind,
  "loading" | "success" | "error" | "warning" | "info"
>

export interface FeedbackContentProps {
  kind: FeedbackKind
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  secondaryAction?: ReactNode
}
