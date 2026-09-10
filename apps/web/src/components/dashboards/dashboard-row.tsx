"use client"

import {
  ArrowRight01Icon,
  DashboardSquare01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { type DashboardSummary } from "@/lib/data/dashboards"

export function DashboardRow({ dashboard }: { dashboard: DashboardSummary }) {
  return (
    <li className="border-border min-w-0 border-b first:border-t">
      <Link
        href={`/dashboards/${dashboard.id}`}
        className="group focus-visible:ring-ring/40 grid min-w-0 gap-4 py-5 outline-none focus-visible:ring-2 focus-visible:ring-inset sm:px-2 md:grid-cols-[minmax(13rem,0.8fr)_minmax(16rem,1.2fr)_auto] md:items-center md:gap-7"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="border-border bg-muted/25 text-muted-foreground grid size-9 shrink-0 place-items-center rounded-md border">
            <HugeiconsIcon
              icon={DashboardSquare01Icon}
              aria-hidden="true"
              className="size-4"
            />
          </span>
          <div className="min-w-0">
            <h3 className="font-heading truncate text-base font-semibold tracking-[-0.015em]">
              {dashboard.title}
            </h3>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {dashboard.context}
            </p>
          </div>
        </div>

        <p className="text-muted-foreground max-w-2xl text-xs leading-5 md:pr-4">
          {dashboard.description}
        </p>

        <div className="flex min-w-0 items-center justify-between gap-5 md:justify-end">
          <div className="text-muted-foreground flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs md:text-right">
            <span>{dashboard.updated}</span>
            <span className="border-border border-l pl-3 font-mono text-[0.6875rem]">
              {dashboard.regionCount} regions
            </span>
          </div>
          <span className="text-foreground flex shrink-0 items-center gap-1.5 text-xs font-medium">
            Open
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </span>
        </div>
      </Link>
    </li>
  )
}
