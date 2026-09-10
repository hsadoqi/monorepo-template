"use client"

import { useState } from "react"

import { dashboards, type DashboardFilter } from "@/lib/data/dashboards"
import { FeaturedDashboard } from "./feature-dashboard"
import { DashboardsIndexHeader } from "./dashboards-index-header"
import { DashboardsSearchContainer } from "./dashboards-search-container"

export function DashboardsIndex() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<DashboardFilter>("All")

  const isDefaultView = query.trim().length === 0 && filter === "All"
  const featuredDashboard = isDefaultView ? dashboards[0] : undefined

  return (
    <main className="mx-auto flex w-full max-w-dvw min-w-0 flex-1 flex-col overflow-x-hidden px-4 py-6 sm:px-6 lg:px-10 lg:py-9 xl:max-w-384">
      <DashboardsIndexHeader query={query} setQuery={setQuery} />

      {featuredDashboard && <FeaturedDashboard dashboard={featuredDashboard} />}

      <DashboardsSearchContainer
        query={query}
        setQuery={setQuery}
        filter={filter}
        setFilter={setFilter}
      />
    </main>
  )
}
