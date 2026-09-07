"use client"

import Search01Icon from "@hugeicons/core-free-icons/Search01Icon"
import PlusSignIcon from "@hugeicons/core-free-icons/PlusSignIcon"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@repo/ui-components/base/button"

export const DashboardHeader = () => {
  return (
    <section className="border-border flex flex-col gap-6 border-b pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-3">
        <p className="text-muted-foreground text-sm">Monday, September 7</p>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Make space for the work that matters.
        </h1>
        <p className="text-muted-foreground max-w-xl text-base leading-6">
          A clear view of your projects, priorities, and the small things
          waiting for your attention.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <HugeiconsIcon icon={Search01Icon} data-icon="inline-start" />
          Search
          <span className="text-muted-foreground ml-2 hidden text-xs sm:inline">
            ⌘ K
          </span>
        </Button>
        <Button size="sm">
          <HugeiconsIcon icon={PlusSignIcon} data-icon="inline-start" />
          New task
        </Button>
      </div>
    </section>
  )
}
