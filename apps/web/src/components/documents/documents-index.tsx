"use client"

import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon"
import File02Icon from "@hugeicons/core-free-icons/File02Icon"
import PlusSignIcon from "@hugeicons/core-free-icons/PlusSignIcon"
import Search01Icon from "@hugeicons/core-free-icons/Search01Icon"
import { HugeiconsIcon } from "@hugeicons/react"
import { buttonVariants } from "@repo/ui-components/base/button"
import { Input } from "@repo/ui-components/base/input"
import { cn } from "@repo/ui-components/lib/utils"
import Link from "next/link"
import { useMemo, useState } from "react"

type DocumentStatus = "Draft" | "Reference" | "Living document"

interface DocumentSummary {
  id: string
  title: string
  excerpt: string
  context: string
  updated: string
  words: string
  status: DocumentStatus
}

const continuedDocument: DocumentSummary = {
  id: "ai-strategy-brief",
  title: "AI strategy brief",
  excerpt:
    "A working position on assistive intelligence, durable context, and the boundaries of automation.",
  context: "Synapcity",
  updated: "Today, 4:18 PM",
  words: "2,840",
  status: "Living document",
}

const documents: DocumentSummary[] = [
  continuedDocument,
  {
    id: "document-workbench-notes",
    title: "Document workbench notes",
    excerpt:
      "Interaction questions for tabs, contextual resources, and trustworthy saving.",
    context: "Product design",
    updated: "Today, 11:42 AM",
    words: "1,206",
    status: "Draft",
  },
  {
    id: "reading-map",
    title: "Reading map: tools for thought",
    excerpt:
      "Ideas and references connecting spatial memory, personal software, and knowledge tools.",
    context: "Research",
    updated: "Yesterday",
    words: "4,512",
    status: "Reference",
  },
  {
    id: "september-field-notes",
    title: "September field notes",
    excerpt:
      "Observations, open loops, and small decisions collected through the month.",
    context: "Journal",
    updated: "Sep 8",
    words: "986",
    status: "Living document",
  },
  {
    id: "connected-data-principles",
    title: "Connected data principles",
    excerpt:
      "Canonical ownership, stable references, and how projections stay trustworthy.",
    context: "Architecture",
    updated: "Sep 6",
    words: "3,104",
    status: "Reference",
  },
]

const filters = ["All", "Living document", "Draft", "Reference"] as const
type Filter = (typeof filters)[number]

export function DocumentsIndex() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("All")

  const visibleDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()

    return documents.filter((document) => {
      const matchesFilter = filter === "All" || document.status === filter
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [document.title, document.excerpt, document.context, document.status]
          .join(" ")
          .toLocaleLowerCase()
          .includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  return (
    <main className="mx-auto flex w-full max-w-[96rem] min-w-0 flex-1 flex-col overflow-x-hidden px-4 py-6 sm:px-6 lg:px-10 lg:py-9">
      <header className="border-border grid gap-6 border-b pb-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-2xl">
          <h1 className="font-heading text-foreground text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Documents
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-6">
            Return to an active thread or find something you have written.
          </p>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center lg:w-auto">
          <label className="relative w-full min-w-0 sm:flex-1 lg:w-64 lg:flex-none">
            <span className="sr-only">Search documents</span>
            <HugeiconsIcon
              icon={Search01Icon}
              aria-hidden="true"
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2"
            />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search documents"
              className="h-9 pl-8"
            />
          </label>
          <Link
            href="/documents/new"
            className={buttonVariants({
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            <HugeiconsIcon icon={PlusSignIcon} data-icon="inline-start" />
            New document
          </Link>
        </div>
      </header>

      <section
        aria-labelledby="continue-heading"
        className="border-border grid border-b lg:grid-cols-[11rem_minmax(0,1fr)]"
      >
        <div className="border-border flex items-start border-b py-5 lg:border-r lg:border-b-0 lg:pr-6">
          <div>
            <h2
              id="continue-heading"
              className="font-heading text-sm font-medium"
            >
              Continue
            </h2>
            <p className="text-muted-foreground mt-1 text-xs leading-5">
              Your latest active thread
            </p>
          </div>
        </div>

        <Link
          href={`/documents/${continuedDocument.id}`}
          className="group focus-visible:ring-ring/40 grid min-w-0 gap-5 px-0 py-6 outline-none focus-visible:ring-2 focus-visible:ring-inset sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:px-8"
        >
          <div className="min-w-0">
            <div className="text-primary mb-3 flex items-center gap-2 text-xs font-medium">
              <span className="bg-primary size-1.5 rounded-full" />
              Edited {continuedDocument.updated.toLocaleLowerCase()}
            </div>
            <h3 className="font-heading text-foreground text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
              {continuedDocument.title}
            </h3>
            <p className="text-muted-foreground mt-2 max-w-2xl min-w-0 text-sm leading-6 break-words">
              {continuedDocument.excerpt}
            </p>
          </div>
          <span className="text-foreground flex items-center gap-2 text-xs font-medium">
            Open document
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </span>
        </Link>
      </section>

      <section aria-labelledby="library-heading" className="pt-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="library-heading"
              className="font-heading text-lg font-semibold tracking-tight"
            >
              All documents
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              {visibleDocuments.length} of {documents.length} documents
            </p>
          </div>

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
        </div>

        <div className="border-border mt-5 overflow-hidden border-y">
          <div className="text-muted-foreground border-border hidden grid-cols-[3.5rem_minmax(16rem,1fr)_minmax(8rem,0.35fr)_8rem_5rem] border-b text-[0.6875rem] lg:grid">
            <span className="border-border border-r px-3 py-2.5 text-right">
              Index
            </span>
            <span className="px-5 py-2.5">Document</span>
            <span className="px-4 py-2.5">Context</span>
            <span className="px-4 py-2.5">Modified</span>
            <span className="px-3 py-2.5 text-right">Words</span>
          </div>

          {visibleDocuments.length > 0 ? (
            <ol className="divide-border divide-y">
              {visibleDocuments.map((document, index) => (
                <li key={document.id}>
                  <Link
                    href={`/documents/${document.id}`}
                    className="group hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-ring/40 grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset motion-reduce:transition-none lg:grid-cols-[3.5rem_minmax(16rem,1fr)_minmax(8rem,0.35fr)_8rem_5rem]"
                  >
                    <span className="text-muted-foreground border-border flex items-start justify-end border-r px-3 py-5 font-mono text-[0.6875rem] tabular-nums lg:py-6">
                      {String(index + 1).padStart(2, "0")}
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
              ))}
            </ol>
          ) : (
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
          )}
        </div>
      </section>
    </main>
  )
}
