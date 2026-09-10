import { FeedbackView } from "@repo/ui-components/components/feedback"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboards",
  description: "Browse and manage your dashboards",
}

export default function DashboardsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboards</h1>
        <p className="text-muted-foreground text-sm">
          Custom views built from your workspace data.
        </p>
      </div>
      <FeedbackView
        kind="empty"
        title="No dashboards yet"
        description="Dashboards you create will show up here."
      />
    </div>
  )
}
