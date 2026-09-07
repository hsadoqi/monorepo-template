import Link from "next/link"

import { Button } from "@repo/ui-components/base/button"
import { FeedbackView } from "@repo/ui-components/components/feedback"

export default function NotFound() {
  return (
    <FeedbackView
      kind="not-found"
      placement="page"
      title="Page not found"
      description="The page may have moved, or the address may be incorrect."
      action={
        <Button nativeButton={false} render={<Link href="/" />}>
          Return to the theme lab
        </Button>
      }
    />
  )
}
