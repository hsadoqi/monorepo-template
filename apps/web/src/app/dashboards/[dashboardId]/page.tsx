import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { buttonVariants } from "@repo/ui-components/base/button"
import { FeedbackView } from "@repo/ui-components/components/feedback"
import type { Metadata } from "next"
import Link from "next/link"

interface DashboardPageProps {
  params: Promise<{ dashboardId: string }>
}

export async function generateMetadata({
  params,
}: DashboardPageProps): Promise<Metadata> {
  const { dashboardId } = await params
  return {
    title: `Dashboard ${dashboardId}`,
  }
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { dashboardId } = await params

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:p-8">
      <Link
        href="/dashboards"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "w-fit",
        })}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        Dashboards
      </Link>
      <FeedbackView
        kind="empty"
        title="This dashboard isn't wired up yet"
        description={`Dashboard "${dashboardId}" will render here once the dashboard system lands.`}
      />
    </div>
  )
}
