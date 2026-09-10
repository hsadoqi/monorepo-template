import { Filter } from "@/lib/data/documents"
import { Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export const EmptyDocumentsTable = ({
  setQuery,
  setFilter,
}: {
  setQuery: (query: string) => void
  setFilter: (filter: Filter) => void
}) => {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center px-6 py-12 text-center">
      <HugeiconsIcon
        icon={Search01Icon}
        aria-hidden="true"
        className="text-muted-foreground size-5"
      />
      <h3 className="font-heading mt-4 text-sm font-semibold">
        No matching documents
      </h3>
      <p className="text-muted-foreground mt-1 max-w-sm text-xs leading-5">
        Try another search or change the active filter.
      </p>
      <button
        type="button"
        onClick={() => {
          setQuery("")
          setFilter("All")
        }}
        className="text-primary focus-visible:ring-ring/40 mt-4 rounded-sm text-xs font-medium outline-none hover:underline focus-visible:ring-2"
      >
        Clear search and filters
      </button>
    </div>
  )
}
