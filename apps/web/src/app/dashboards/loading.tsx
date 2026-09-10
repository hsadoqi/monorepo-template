import { FeedbackView } from "@repo/ui-components/components/feedback"

export default function Loading() {
  return (
    <FeedbackView
      kind="loading"
      placement="page"
      title="Loading dashboards"
      description="Your dashboards will be ready in a moment."
    />
  )
}
