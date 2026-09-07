"use client"

import type { ReactNode } from "react"
import { Toaster, toast, type ExternalToast } from "sonner"

export interface FeedbackToastPromiseMessages<T> {
  loading: ReactNode
  success: ReactNode | ((data: T) => ReactNode)
  error: ReactNode | ((error: unknown) => ReactNode)
  description?: ReactNode | ((data: T) => ReactNode)
  finally?: () => void | Promise<void>
}

export interface FeedbackToastApi {
  show(message: ReactNode, options?: ExternalToast): string | number
  success(message: ReactNode, options?: ExternalToast): string | number
  error(message: ReactNode, options?: ExternalToast): string | number
  warning(message: ReactNode, options?: ExternalToast): string | number
  info(message: ReactNode, options?: ExternalToast): string | number
  loading(message: ReactNode, options?: ExternalToast): string | number
  dismiss(id?: string | number): string | number
  promise<T>(
    promise: Promise<T> | (() => Promise<T>),
    messages: FeedbackToastPromiseMessages<T>
  ): { unwrap(): Promise<T> }
}

export const feedbackToast: FeedbackToastApi = {
  show: (message, options) => toast(message, options),
  success: (message, options) => toast.success(message, options),
  error: (message, options) => toast.error(message, options),
  warning: (message, options) => toast.warning(message, options),
  info: (message, options) => toast.info(message, options),
  loading: (message, options) => toast.loading(message, options),
  dismiss: (id) => toast.dismiss(id),
  promise: <T,>(
    promise: Promise<T> | (() => Promise<T>),
    messages: FeedbackToastPromiseMessages<T>
  ) => toast.promise(promise, messages),
}

export function FeedbackToaster() {
  return (
    <Toaster
      theme="system"
      position="bottom-right"
      mobileOffset={16}
      offset={20}
      gap={8}
      visibleToasts={4}
      closeButton
      toastOptions={{
        closeButtonAriaLabel: "Dismiss notification",
        classNames: {
          toast: "border-border bg-popover text-popover-foreground",
          title: "font-medium",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
    />
  )
}
