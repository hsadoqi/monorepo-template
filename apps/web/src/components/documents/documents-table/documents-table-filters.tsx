import { Filter, filters } from "@/lib/data/documents"
import { cn } from "@repo/ui-components/lib/utils"

export const DocumentsTableFilters = ({
  setFilter,
  filter,
}: {
  setFilter: (filter: Filter) => void
  filter: Filter
}) => {
  return (
    <div
      role="group"
      aria-label="Filter documents"
      className="flex max-w-full gap-1 overflow-x-auto pb-1 sm:justify-end"
    >
      {filters.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={filter === option}
          onClick={() => setFilter(option)}
          className={cn(
            "focus-visible:border-ring focus-visible:ring-ring/30 shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors outline-none focus-visible:ring-2 motion-reduce:transition-none",
            filter === option
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
