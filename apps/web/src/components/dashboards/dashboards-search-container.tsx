"use client"

import { DashboardFilter, dashboards } from "@/lib/data/dashboards"
import { DashboardRow } from "./dashboard-row"
import { DashboardsFilters } from "./dashboards-filters"
import { EmptyDashboards } from "./empty-dashboards"
import { useMemo } from "react"

export const DashboardsSearchContainer = ({
  query,
  setQuery,
  filter,
  setFilter,
}: {
  query: string
  setQuery: (query: string) => void
  filter: DashboardFilter
  setFilter: (filter: DashboardFilter) => void
}) => {
  const visibleDashboards = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()

    return dashboards.filter((dashboard) => {
      const matchesFilter = filter === "All" || dashboard.context === filter
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [dashboard.title, dashboard.description, dashboard.context]
          .join(" ")
          .toLocaleLowerCase()
          .includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  const isDefaultView = query.trim().length === 0 && filter === "All"
  const featuredDashboard = isDefaultView ? dashboards[0] : undefined
  const registerDashboards = featuredDashboard
    ? visibleDashboards.filter(
        (dashboard) => dashboard.id !== featuredDashboard.id
      )
    : visibleDashboards
  const clearFilters = () => {
    setQuery("")
    setFilter("All")
  }
  return (
    <section aria-labelledby="dashboard-shelf-heading" className="pt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="dashboard-shelf-heading"
            className="font-heading text-lg font-semibold tracking-tight"
          >
            Your canvases
          </h2>
          <p className="text-muted-foreground mt-1 text-xs" aria-live="polite">
            {visibleDashboards.length} of {dashboards.length} dashboards
          </p>
        </div>

        <DashboardsFilters filter={filter} setFilter={setFilter} />
      </div>

      {registerDashboards.length > 0 ? (
        <ul className="mt-5">
          {registerDashboards.map((dashboard) => (
            <DashboardRow key={dashboard.id} dashboard={dashboard} />
          ))}
        </ul>
      ) : visibleDashboards.length === 0 ? (
        <EmptyDashboards clearFilters={clearFilters} />
      ) : null}
    </section>
  )
}
