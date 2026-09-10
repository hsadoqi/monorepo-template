import { type DashboardSummary } from "@/lib/data/dashboards"

export function DashboardMeta({ dashboard }: { dashboard: DashboardSummary }) {
  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      <span>{dashboard.context}</span>
      <span className="border-border border-l pl-3">{dashboard.updated}</span>
      <span className="border-border border-l pl-3 font-mono text-[0.6875rem]">
        {dashboard.regionCount} regions
      </span>
    </div>
  )
}
