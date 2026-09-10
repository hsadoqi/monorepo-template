"use client"

import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { type DashboardSummary } from "@/lib/data/dashboards"
import { DashboardMeta } from "./dashboard-meta"

export function FeaturedDashboard({
  dashboard,
}: {
  dashboard: DashboardSummary
}) {
  return (
    <section aria-labelledby="recent-dashboard-heading" className="pt-7">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2
            id="recent-dashboard-heading"
            className="font-heading text-sm font-medium"
          >
            Pick up where you left off
          </h2>
          <p className="text-muted-foreground mt-1 text-xs">
            Your most recently opened canvas
          </p>
        </div>
      </div>

      <Link
        href={`/dashboards/${dashboard.id}`}
        className="group focus-visible:ring-ring/40 border-border before:bg-primary relative grid min-w-0 gap-6 border-y py-6 pl-5 outline-none before:absolute before:top-6 before:bottom-6 before:left-0 before:w-1 before:rounded-full focus-visible:ring-2 focus-visible:ring-inset sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-10 sm:py-7 sm:pl-7"
      >
        <div className="min-w-0">
          <DashboardMeta dashboard={dashboard} />
          <h3 className="font-heading mt-5 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {dashboard.title}
          </h3>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-6">
            {dashboard.description}
          </p>
        </div>

        <span className="flex items-center gap-2 text-xs font-medium sm:pb-1">
          Open dashboard
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </span>
      </Link>
    </section>
  )
}
