"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { buttonVariants } from "@repo/ui-components/base/button"
import { Input } from "@repo/ui-components/base/input"
import { Search01Icon, PlusSignIcon } from "@hugeicons/core-free-icons"

import Link from "next/link"

export const DocumentsHeader = ({
  query,
  setQuery,
}: {
  query: string
  setQuery: (query: string) => void
}) => {
  return (
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
  )
}
