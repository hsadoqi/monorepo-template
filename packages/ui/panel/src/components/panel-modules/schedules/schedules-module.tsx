"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Input } from "@repo/ui-components/base/input"
import { Button } from "@repo/ui-components/base/button"
import { IconButton } from "@repo/ui-components"
import { useModulesStore } from "@repo/runtime-panel"
import { IconPicker } from "./icon-picker"
import { resolveScheduleIcon } from "./icon-options"

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
