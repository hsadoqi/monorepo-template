import { DashboardsSearchForm } from "./dashboards-search-form"

export const DashboardsIndexHeader = ({
  query,
  setQuery,
}: {
  query: string
  setQuery: (query: string) => void
}) => {
  return (
    <header className="border-border grid gap-6 border-b pb-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      <div className="max-w-2xl">
        <h1 className="font-heading text-foreground text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Dashboards
        </h1>
        <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-6">
          Shape the information you already keep into views that fit how you
          think and work.
        </p>
      </div>

      <DashboardsSearchForm query={query} setQuery={setQuery} />
    </header>
  )
}
