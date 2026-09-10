"use client"

import { Button } from "@repo/ui-components/base/button"
import { FeedbackView } from "@repo/ui-components/components/feedback"

export default function DocumentsError({ reset }: { reset(): void }) {
  return (
    <FeedbackView
      kind="error"
      placement="page"
      title="We couldn’t load your documents"
      description="Something unexpected happened. You can try the request again."
      action={<Button onClick={reset}>Try again</Button>}
    />
  )
}
