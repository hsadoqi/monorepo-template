"use client"

import { Button } from "@repo/ui-components/base/button"
import {
  ArrowUpRight01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@repo/ui-components/base/badge"
import { MoreHorizontalIcon, SparklesIcon } from "@hugeicons/core-free-icons"
// import { QuickCaptureCard } from "../../components/quarantine/quick-capture-card"
import { HugeiconsIcon } from "@hugeicons/react"

export type Task = {
  title: string
  project: string
  due: string
  priority: string
}

export const UpcomingTasksCard = ({ tasks }: { tasks: Task[] }) => {
  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)]">
      <div className="border-border bg-card flex flex-col gap-5 rounded-xl border p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={SparklesIcon} className="text-primary" />
              <h2 className="text-lg font-semibold">Your focus</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Three things that will move the week forward.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="More focus options"
          >
            <HugeiconsIcon icon={MoreHorizontalIcon} />
          </Button>
        </div>
        <div className="divide-border flex flex-col divide-y">
          {tasks.map((task) => (
            <div
              className="flex items-center gap-3 py-4 first:pt-1 last:pb-1"
              key={task.title}
            >
              <button
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`Complete ${task.title}`}
              >
                <HugeiconsIcon icon={CheckmarkCircle02Icon} />
              </button>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-sm font-medium">
                  {task.title}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {task.project}
                </span>
              </div>
              <div className="text-muted-foreground hidden items-center gap-3 text-xs sm:flex">
                <Badge
                  variant={task.priority === "high" ? "default" : "secondary"}
                >
                  {task.priority}
                </Badge>
                <span>{task.due}</span>
              </div>
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                className="text-muted-foreground"
              />
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground justify-start px-0 hover:bg-transparent"
        >
          View all tasks
          <HugeiconsIcon icon={ArrowUpRight01Icon} data-icon="inline-end" />
        </Button>
      </div>

      {/* <QuickCaptureCard /> */}
    </section>
  )
}
