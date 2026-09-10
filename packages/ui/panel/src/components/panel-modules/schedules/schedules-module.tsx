"use client"

import { useState } from "react"
import { FlashIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Input } from "@repo/ui-components/base/input"
import { Button } from "@repo/ui-components/base/button"
import { IconButton } from "@repo/ui-components"
import { useModulesStore } from "@repo/runtime-panel"
import { IconPicker } from "./icon-picker"
import { resolveScheduleIcon } from "./icon-options"

const QUICK_CREATE_PRESETS = [
  { label: "15-min check-in", time: "Today, 15:00" },
  { label: "30-min 1:1", time: "Today, 16:30" },
  { label: "Focus block", time: "Tomorrow, 09:00" },
  { label: "All-day review", time: "Fri, all day" },
]

export function SchedulesModule() {
  const scheduleIds = useModulesStore((state) => state.scheduleIds)
  const scheduleEntities = useModulesStore((state) => state.scheduleEntities)
  const addScheduleEvent = useModulesStore((state) => state.addScheduleEvent)
  const deleteScheduleEvent = useModulesStore(
    (state) => state.deleteScheduleEvent
  )
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [icon, setIcon] = useState<string | undefined>(undefined)

  const upcoming = scheduleIds
    .map((id) => scheduleEntities[id])
    .filter((event): event is NonNullable<typeof event> => Boolean(event))
    .sort((a, b) => a.createdAt - b.createdAt)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-card p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-primary/15 text-primary flex size-7 items-center justify-center rounded-md">
            <HugeiconsIcon icon={FlashIcon} className="size-3.5" />
          </div>
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
            Quick create
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {QUICK_CREATE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className="hover:bg-muted flex flex-col gap-0.5 rounded-md border border-border bg-card p-2 text-left text-xs"
              onClick={() => addScheduleEvent(preset.label, preset.time)}
            >
              <span className="text-card-foreground font-semibold">
                {preset.label}
              </span>
              <span className="text-muted-foreground">{preset.time}</span>
            </button>
          ))}
        </div>
      </div>

      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault()
          if (!title.trim() || !time.trim()) return
          addScheduleEvent(title.trim(), time.trim(), icon)
          setTitle("")
          setTime("")
          setIcon(undefined)
        }}
      >
        <IconPicker value={icon} onChange={setIcon} />
        <Input
          aria-label="Event title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Event title"
        />
        <Input
          aria-label="Event time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          placeholder="e.g. Today, 2:00 PM"
        />
        <Button type="submit" size="sm">
          Add event
        </Button>
      </form>

      <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-3 shadow-sm">
        <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
          Coming up
        </span>
        {upcoming.length === 0 ? (
          <p className="text-muted-foreground py-1 text-sm">
            Nothing scheduled yet.
          </p>
        ) : (
          <ul className="flex flex-col">
            {upcoming.map((event) => (
              <li key={event.id} className="group flex items-center gap-3 py-1">
                <HugeiconsIcon
                  icon={resolveScheduleIcon(event.icon)}
                  className="text-muted-foreground size-3.5 shrink-0"
                />
                <span className="text-card-foreground w-24 shrink-0 font-mono text-xs">
                  {event.time}
                </span>
                <span className="text-card-foreground flex-1 truncate text-sm">
                  {event.title}
                </span>
                <IconButton
                  variant="ghost"
                  size="icon-sm"
                  className="opacity-0 group-hover:opacity-100"
                  label={`Delete ${event.title}`}
                  onClick={() => deleteScheduleEvent(event.id)}
                >
                  ×
                </IconButton>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
