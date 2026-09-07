"use client"

import type { ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../base/ui/dialog"
import { FeedbackIcon } from "./feedback-icon"
import type { FeedbackLiveKind } from "./feedback-types"

export interface FeedbackDialogProps {
  open: boolean
  onOpenChange(open: boolean): void
  kind: Exclude<FeedbackLiveKind, "loading">
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  secondaryAction?: ReactNode
}

export function FeedbackDialog({
  open,
  onOpenChange,
  kind,
  title,
  description,
  action,
  secondaryAction,
}: FeedbackDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="pr-8">
          <div className="bg-muted text-muted-foreground mb-2 flex size-9 items-center justify-center rounded-full">
            <FeedbackIcon kind={kind} className="size-4" />
          </div>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        {action || secondaryAction ? (
          <DialogFooter>
            {secondaryAction}
            {action}
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
