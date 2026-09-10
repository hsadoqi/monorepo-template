"use client"

import {
  FlashIcon,
  Note01FreeIcons,
  StopWatchFreeIcons,
  StudyDeskFreeIcons,
  Time,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { feedbackToast } from "@repo/ui-components/components/feedback"
import { useModulesStore } from "@repo/runtime-panel"

const FOCUS_SESSION_DURATION_MS = 25 * 60 * 1000

interface QuickCreatePreset {
  id: string
  label: string
  description: string
  icon: IconSvgElement
  run: () => void
}

export function OverviewModule() {
  const addScheduleEvent = useModulesStore((state) => state.addScheduleEvent)
  const addNote = useModulesStore((state) => state.addNote)
  const startFocus = useModulesStore((state) => state.startFocus)

  const presets: readonly QuickCreatePreset[] = [
    {
      id: "check-in",
      label: "15-min check-in",
      description: "Add a check-in to today's schedule",
      icon: Time,
      run: () => {
        addScheduleEvent("Check-in", new Date().toISOString(), "Clock")
        feedbackToast.success("Check-in added to today's schedule")
      },
    },
    {
      id: "one-on-one",
      label: "30-min 1:1",
      description: "Add a 1:1 to today's schedule",
      icon: StudyDeskFreeIcons,
      run: () => {
        addScheduleEvent("1:1", new Date().toISOString(), "Team")
        feedbackToast.success("1:1 added to today's schedule")
      },
    },
    {
      id: "note",
      label: "Create new note",
      description: "Add a blank note ready for editing",
      icon: Note01FreeIcons,
      run: () => {
        addNote("")
        feedbackToast.success("Note created")
      },
    },
    {
      id: "focus",
      label: "Focus session",
      description: "Start a 25-minute focus session",
      icon: StopWatchFreeIcons,
      run: () => {
        startFocus(FOCUS_SESSION_DURATION_MS)
        feedbackToast.success("Focus session started")
      },
    },
  ]

  return (
    <section
      aria-labelledby="overview-quick-create-heading"
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <div className="bg-primary/15 text-primary flex size-7 items-center justify-center rounded-md">
          <HugeiconsIcon icon={FlashIcon} className="size-3.5" />
        </div>
        <h2
          id="overview-quick-create-heading"
          className="text-muted-foreground text-xs font-semibold uppercase tracking-wide"
        >
          Quick create
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="hover:bg-muted focus-visible:ring-ring flex items-start gap-2 rounded-md border border-border bg-card p-3 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={preset.run}
          >
            <HugeiconsIcon
              icon={preset.icon}
              className="text-primary mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-card-foreground font-semibold">
                {preset.label}
              </span>
              <span className="text-muted-foreground">
                {preset.description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
