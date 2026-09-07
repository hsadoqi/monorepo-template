"use client"

import { useState, type KeyboardEvent } from "react"
import { InboxIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@repo/ui-components/base/button"
import { Input } from "@repo/ui-components/base/input"

import { useRehydrateStore } from "@repo/services-zustand/react"

import { useCaptureInboxStore } from "@/components/capture-inbox/use-capture-inbox-store"
import type {
  CaptureItem,
  CaptureTag,
} from "@/components/capture-inbox/capture-inbox-schema"

const TAG_OPTIONS: readonly CaptureTag[] = ["task", "note", "reference"]

function TriageRow({ item, position }: { item: CaptureItem; position: number }) {
  const tag = useCaptureInboxStore((state) => state.tag)
  const archive = useCaptureInboxStore((state) => state.archive)
  const deleteItem = useCaptureInboxStore((state) => state.delete)
  const describe = (action: string) =>
    `Item ${position}: ${action} ("${item.text}")`

  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="min-w-0 flex-1 truncate text-sm">{item.text}</span>
      <div className="flex shrink-0 items-center gap-1.5">
        {TAG_OPTIONS.map((option) => (
          <Button
            key={option}
            variant="outline"
            size="xs"
            aria-label={describe(`Tag as ${option}`)}
            onClick={() => tag(item.id, option)}
          >
            {option[0]!.toUpperCase()}
            {option.slice(1)}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="xs"
          aria-label={describe("Archive")}
          onClick={() => archive(item.id)}
        >
          Archive
        </Button>
        <Button
          variant="destructive"
          size="xs"
          aria-label={describe("Delete")}
          onClick={() => deleteItem(item.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export function QuickCaptureCard() {
  useRehydrateStore(useCaptureInboxStore)

  const [draft, setDraft] = useState("")
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const capture = useCaptureInboxStore((state) => state.capture)
  const items = useCaptureInboxStore((state) => state.items)
  const unsortedItems = items.filter((item) => item.status === "unsorted")
  const unsortedCount = unsortedItems.length
  // const unsortedItems = useCaptureInboxStore((state) => state.items.filter((item) => item.status === "unsorted"))
  // const unsortedCount = unsortedItems.length


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
        <Button
          variant="link"
          size="sm"
          className="ml-auto h-auto p-0"
          aria-expanded={isReviewOpen}
          onClick={() => setIsReviewOpen((open) => !open)}
        >
          Review
        </Button>
      </div>
      {isReviewOpen && (
        <div className="border-border divide-border flex flex-col divide-y border-t pt-3">
          {unsortedItems.length === 0 ? (
            <p className="text-muted-foreground py-2 text-sm">
              Nothing to sort
            </p>
          ) : (
            unsortedItems.map((item, index) => (
              <TriageRow key={item.id} item={item} position={index + 1} />
            ))
          )}
        </div>
      )}
    </div>
  )
}
