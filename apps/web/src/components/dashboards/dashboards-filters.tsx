import { dashboardContexts, DashboardFilter } from "@/lib/data/dashboards"

export const DashboardsFilters = ({
  filter,
  setFilter,
}: {
  filter: DashboardFilter
  setFilter: (filter: DashboardFilter) => void
}) => {
  return (
    <div
      className="border-border flex w-fit max-w-full gap-1 overflow-x-auto rounded-md border p-1"
      aria-label="Filter dashboards by context"
    >
      {dashboardContexts.map((context) => (
        <button
          key={context}
          type="button"
          aria-pressed={filter === context}
          onClick={() => setFilter(context)}
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/40 aria-pressed:bg-primary aria-pressed:text-primary-foreground shrink-0 rounded-sm px-2.5 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-2 motion-reduce:transition-none"
        >
          {context}
        </button>
      ))}
    </div>
  )
}
