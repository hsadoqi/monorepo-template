import { DashboardsIndex } from "@/components/dashboards/dashboards-index"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboards",
  description: "Browse and manage your dashboards",
}

export default function DashboardsPage() {
  return <DashboardsIndex />
}
