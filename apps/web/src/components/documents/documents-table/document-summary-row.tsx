"use client"
import { File02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import type { DocumentSummary } from "@/lib/data/documents"

export const DocumentSummaryRow = ({
  document,
  documentIndex,
}: {
  document: DocumentSummary
  documentIndex: number
}) => {
  return (
    <li key={document.id}>
      <Link
        href={`/documents/${document.id}`}
        className="group hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-ring/40 grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset motion-reduce:transition-none lg:grid-cols-[3.5rem_minmax(16rem,1fr)_minmax(8rem,0.35fr)_8rem_5rem]"
      >
        <span className="text-muted-foreground border-border flex items-start justify-end border-r px-3 py-5 font-mono text-[0.6875rem] tabular-nums lg:py-6">
          {String(documentIndex + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 px-4 py-5 lg:px-5 lg:py-6">
          <span className="flex items-start gap-3">
            <HugeiconsIcon
              icon={File02Icon}
              aria-hidden="true"
              className="text-primary mt-0.5 size-4 shrink-0"
            />
            <span className="min-w-0">
              <span className="font-heading text-foreground group-hover:text-primary block truncate text-sm font-semibold transition-colors motion-reduce:transition-none sm:text-base">
                {document.title}
              </span>
              <span className="text-muted-foreground mt-1 line-clamp-2 block max-w-2xl text-xs leading-5">
                {document.excerpt}
              </span>
              <span className="text-muted-foreground mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.6875rem] lg:hidden">
                <span>{document.context}</span>
                <span>{document.updated}</span>
                <span>{document.words} words</span>
              </span>
            </span>
          </span>
        </span>
        <span className="text-muted-foreground hidden items-center px-4 text-xs lg:flex">
          {document.context}
        </span>
        <span className="text-muted-foreground hidden items-center px-4 text-xs lg:flex">
          {document.updated}
        </span>
        <span className="text-muted-foreground hidden items-center justify-end px-3 font-mono text-[0.6875rem] tabular-nums lg:flex">
          {document.words}
        </span>
      </Link>
    </li>
  )
}
