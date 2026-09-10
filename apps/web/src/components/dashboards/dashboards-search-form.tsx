"use client"

import { PlusSignIcon, Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { buttonVariants } from "@repo/ui-components/base/button"
import { Input } from "@repo/ui-components/base/input"
import Link from "next/link"

export const DashboardsSearchForm = ({
  query,
  setQuery,
}: {
  query: string
  setQuery: (query: string) => void
}) => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center lg:w-auto">
      <label className="relative w-full min-w-0 sm:flex-1 lg:w-64 lg:flex-none">
        <span className="sr-only">Search dashboards</span>
        <HugeiconsIcon
          icon={Search01Icon}
          aria-hidden="true"
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2"
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search dashboards"
          className="h-9 pl-8"
        />
      </label>
      <Link
        href="/dashboards/new"
        className={buttonVariants({
          size: "lg",
          className: "w-full sm:w-auto",
        })}
      >
        <HugeiconsIcon icon={PlusSignIcon} data-icon="inline-start" />
        New dashboard
      </Link>
    </div>
  )
}
