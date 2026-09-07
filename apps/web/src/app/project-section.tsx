"use client"

import {
  ArrowUpRight01Icon,
  Calendar03Icon,
  Clock01Icon,
  Folder02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@repo/ui-components/base/button"

export type Project = {
  name: string
  detail: string
  color: string
}

export const ProjectsSectionHeader = ({
  projects,
}: {
  projects: Project[]
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Active projects</h2>
          <p className="text-muted-foreground text-sm">
            A quick pulse across your workspace.
          </p>
        </div>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {projects.map((project) => (
          <a
            className="group border-border bg-background hover:border-primary/50 hover:bg-muted/40 flex min-h-32 flex-col justify-between rounded-lg border p-4 transition-colors"
            href="#"
            key={project.name}
          >
            <div className="flex items-start justify-between gap-3">
              <span className={`size-2.5 rounded-full ${project.color}`} />
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-medium">{project.name}</h3>
              <p className="text-muted-foreground text-xs">{project.detail}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export const ProjectSection = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="border-border grid gap-8 border-t pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.55fr)]">
      <ProjectsSectionHeader projects={projects} />
      <Schedule />
    </section>
  )
}

export const Schedule = () => (
  <div className="lg:border-border flex flex-col gap-5 lg:border-l lg:pl-8">
    <div className="flex items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Coming up</h2>
        <p className="text-muted-foreground text-sm">Your next few moments.</p>
      </div>
      <HugeiconsIcon icon={Calendar03Icon} className="text-muted-foreground" />
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 text-primary mt-1 flex size-8 shrink-0 items-center justify-center rounded-md">
          <HugeiconsIcon icon={UserGroupIcon} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Team sync</span>
          <span className="text-muted-foreground text-xs">Today, 2:00 PM</span>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="bg-accent/15 text-accent-foreground mt-1 flex size-8 shrink-0 items-center justify-center rounded-md">
          <HugeiconsIcon icon={Folder02Icon} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Planning review</span>
          <span className="text-muted-foreground text-xs">
            Tomorrow, 10:30 AM
          </span>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="bg-muted text-muted-foreground mt-1 flex size-8 shrink-0 items-center justify-center rounded-md">
          <HugeiconsIcon icon={Clock01Icon} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Weekly reset</span>
          <span className="text-muted-foreground text-xs">Friday, 4:00 PM</span>
        </div>
      </div>
    </div>
  </div>
)
