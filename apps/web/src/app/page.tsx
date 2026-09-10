"use client"

import { Task01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@repo/ui-components/base/button"
import { ProjectSection } from "./project-section"
import { DashboardHeader } from "./dashboard-header"
import { UpcomingTasksCard } from "./upcoming-tasks-card"
// import { QuickCaptureCard } from "../components/quarantine/quick-capture-card"

const projects = [
  {
    name: "Website refresh",
    detail: "Design system migration",
    color: "bg-primary",
  },
  {
    name: "Q4 planning",
    detail: "Strategy and priorities",
    color: "bg-accent",
  },
  { name: "Mobile app", detail: "Product delivery", color: "bg-info" },
]

const tasks = [
  {
    title: "Review navigation exploration",
    project: "Website refresh",
    due: "Today",
    priority: "High",
  },
  {
    title: "Share the launch brief",
    project: "Q4 planning",
    due: "Tomorrow",
    priority: "Medium",
  },
  {
    title: "Clarify offline states",
    project: "Mobile app",
    due: "Friday",
    priority: "Low",
  },
]

export default function Page() {
  return (
    <main className="flex flex-1 flex-col gap-8 px-5 py-6 md:px-8 md:py-8">
      <DashboardHeader />
      <UpcomingTasksCard tasks={tasks} />
      {/* <QuickCaptureCard /> */}
      <ProjectSection projects={projects} />

      <section className="border-primary/20 bg-primary/5 flex flex-col gap-4 rounded-xl border p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
            <HugeiconsIcon icon={Task01Icon} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold">Your workspace is taking shape.</h2>
            <p className="text-muted-foreground text-sm">
              Invite your team to make planning a shared habit.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Invite teammates
        </Button>
      </section>
    </main>
  )
}
