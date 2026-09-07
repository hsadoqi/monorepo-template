"use client"

import { useState, type KeyboardEvent } from "react"
import { InboxIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@repo/ui-components/base/button"
import { Input } from "@repo/ui-components/base/input"

import { useCaptureInboxStore } from "@/components/capture-inbox/use-capture-inbox-store"

export function QuickCaptureCard() {
  const [draft, setDraft] = useState("")
  const capture = useCaptureInboxStore((state) => state.capture)
  const unsortedCount = useCaptureInboxStore(
    (state) => state.items.filter((item) => item.status === "unsorted").length
  )

  function handleCapture() {
    if (!draft.trim()) return
    capture(draft)
    setDraft("")
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleCapture()
    }
  }

  return (
    <div className="border-border bg-muted/40 flex flex-col gap-5 rounded-xl border p-5 md:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Quick capture</h2>
        <p className="text-muted-foreground text-sm">
          Get it out of your head. Sort it later.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          placeholder="What needs your attention?"
          aria-label="Capture a thought"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground text-xs">
            Press Enter to save
          </span>
          <Button size="sm" onClick={handleCapture}>
            Capture
          </Button>
        </div>
      </div>
      <div className="border-border text-muted-foreground flex items-center gap-2 border-t pt-4 text-xs">
        <HugeiconsIcon icon={InboxIcon} />
        <span>
          {unsortedCount} unsorted item{unsortedCount === 1 ? "" : "s"}
        </span>
        <Button variant="link" size="sm" className="ml-auto h-auto p-0">
          Review
        </Button>
      </div>
    </div>
  )
}
