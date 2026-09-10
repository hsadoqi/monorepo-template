import { Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export const EmptyDashboards = ({
  clearFilters,
}: {
  clearFilters: () => void
}) => {
  return (
    <div className="border-border mt-5 flex min-h-56 flex-col items-center justify-center border-y px-5 py-10 text-center">
      <div className="border-border bg-muted/30 mb-4 grid size-10 place-items-center rounded-md border">
        <HugeiconsIcon
          icon={Search01Icon}
          aria-hidden="true"
          className="text-muted-foreground size-4"
        />
      </div>
      <h3 className="font-heading text-sm font-semibold">
        No matching dashboards
      </h3>
      <p className="text-muted-foreground mt-1 max-w-sm text-xs leading-5">
        Try another search or show every dashboard context.
      </p>
      <button
        type="button"
        onClick={clearFilters}
        className="text-primary focus-visible:ring-ring/40 mt-4 rounded-sm text-xs font-medium outline-none hover:underline focus-visible:ring-2"
      >
        Clear search and filters
      </button>
    </div>
  )
}
