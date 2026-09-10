import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { buttonVariants } from "@repo/ui-components/base/button"
import { FeedbackView } from "@repo/ui-components/components/feedback"
import type { Metadata } from "next"
import Link from "next/link"

interface DocumentPageProps {
  params: Promise<{ documentId: string }>
}

export async function generateMetadata({
  params,
}: DocumentPageProps): Promise<Metadata> {
  const { documentId } = await params
  return {
    title: `Document ${documentId}`,
  }
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { documentId } = await params

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:p-8">
      <Link
        href="/documents"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "w-fit",
        })}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        Documents
      </Link>
      <FeedbackView
        kind="empty"
        title="Document editing isn't wired up yet"
        description={`Document "${documentId}" will open here once the document editor lands.`}
      />
    </div>
  )
}
