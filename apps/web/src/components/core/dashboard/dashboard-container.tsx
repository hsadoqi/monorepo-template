import { DashboardContent } from "./dashboard-content"
import { DashboardHeader } from "./dashboard-header"

export default function DashboardContainer() {
  return (
    <main className="flex flex-1 flex-col gap-8 px-5 py-6 md:px-8 md:py-8">
      <DashboardHeader />
      <DashboardContent />
    </main>
  )
}
