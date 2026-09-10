"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Input } from "@repo/ui-components/base/input"
import { Button } from "@repo/ui-components/base/button"
import { SCHEDULE_ICON_OPTIONS, resolveScheduleIcon } from "./icon-options"

export interface IconPickerProps {
  value: string | undefined
  onChange: (name: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")

  const filtered = SCHEDULE_ICON_OPTIONS.filter((option) =>
    option.name.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Choose icon"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <HugeiconsIcon icon={resolveScheduleIcon(value)} className="size-3.5" />
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-56 rounded-md border border-border bg-popover p-2 shadow-md">
          <Input
            autoFocus
            placeholder="Search icons"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mb-2"
          />
          <div
            role="listbox"
            aria-label="Icon options"
            className="grid max-h-40 grid-cols-6 gap-1 overflow-y-auto"
          >
            {filtered.map((option) => (
              <button
                key={option.name}
                type="button"
                role="option"
                aria-selected={value === option.name}
                title={option.name}
                aria-label={option.name}
                className="hover:bg-muted flex size-7 items-center justify-center rounded-md"
                onClick={() => {
                  onChange(option.name)
                  setIsOpen(false)
                  setQuery("")
                }}
              >
                <HugeiconsIcon icon={option.icon} className="size-3.5" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
