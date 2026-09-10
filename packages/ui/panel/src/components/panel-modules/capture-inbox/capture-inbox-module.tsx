"use client"

import { useRef, useState } from "react"
import { InboxIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@repo/ui-components/base/button"
import { IconButton } from "@repo/ui-components/buttons/icon-button"
import { useModulesStore } from "@repo/runtime-panel"

export function CaptureInboxModule() {
  const inboxItemIds = useModulesStore((state) => state.inboxItemIds)
  const inboxItemEntities = useModulesStore((state) => state.inboxItemEntities)
  const addInboxItem = useModulesStore((state) => state.addInboxItem)
  const removeInboxItem = useModulesStore((state) => state.removeInboxItem)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddInboxItem = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      try {
        addInboxItem({
          id: crypto.randomUUID(),
          text: inputRef.current.value.trim(),
          createdAt: Date.now(),
          status: "unsorted",
        })
        setError(null)
      } catch (err) {
        console.error("Failed to add inbox item:", err)
        setError("Failed to add inbox item.")
      } finally {
        inputRef.current.value = ""
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-card p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-primary/15 text-primary flex size-7 items-center justify-center rounded-md">
            <HugeiconsIcon icon={InboxIcon} className="size-3.5" />
          </div>
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
            Capture Inbox
          </span>
        </div>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add a new item..."
            className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddInboxItem()
              }
            }}
          />
          <Button variant="default" size="sm" onClick={handleAddInboxItem}>
            Add
          </Button>
        </div>
        {error && <p className="text-destructive text-xs">{error}</p>}
      </div>
      <div className="flex flex-col gap-2">
        {inboxItemIds.map((id) => {
          const item = inboxItemEntities[id]
          if (!item) return null
          return (
            <div
              key={id}
              className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground"
            >
              <span>{item.text}</span>
              <IconButton
                label={item.text}
                aria-label={`Delete ${item.text}`}
                onClick={() => removeInboxItem(id)}
              >
                <HugeiconsIcon icon={InboxIcon} className="size-4" />
              </IconButton>
            </div>
          )
        })}
      </div>
    </div>
  )
}
