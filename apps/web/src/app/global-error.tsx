"use client"

import { Button } from "@repo/ui-components/base/button"
import { FeedbackView } from "@repo/ui-components/components/feedback"

import "./globals.css"

export default function GlobalError({ reset }: { reset(): void }) {
  return (
    <html lang="en">
      <body>
        <FeedbackView
          kind="error"
          placement="page"
          title="Synapcity needs to restart"
          description="A critical application error interrupted this session. Your saved work has not been changed."
          action={<Button onClick={reset}>Restart application</Button>}
        />
      </body>
    </html>
  )
}
