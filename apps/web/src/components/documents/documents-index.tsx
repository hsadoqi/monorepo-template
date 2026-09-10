"use client"

import { documents, type Filter } from "@/lib/data/documents"
import { useMemo, useState } from "react"
import { DocumentsHeader } from "./documents-header"
import { EmptyDocumentsTable } from "./documents-table/empty-documents-table"
import { ContinueDocumentSection } from "./continue-document-section"
import { DocumentsTableFilters } from "./documents-table/documents-table-filters"
import { DocumentSummaryRow } from "./documents-table/document-summary-row"
import { DocumentsTableHeader } from "./documents-table/documents-table-header"

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
    <main className="mx-auto flex w-full max-w-dvw min-w-0 flex-1 flex-col overflow-x-hidden px-4 py-6 sm:px-6 lg:px-10 lg:py-9 xl:max-w-384">
      <DocumentsHeader query={query} setQuery={setQuery} />

      <ContinueDocumentSection />

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

          <DocumentsTableFilters filter={filter} setFilter={setFilter} />
        </div>

        <div className="border-border mt-5 overflow-hidden border-y">
          <DocumentsTableHeader />

          {visibleDocuments.length > 0 ? (
            <ol className="divide-border divide-y">
              {visibleDocuments.map((document, index) => (
                <DocumentSummaryRow
                  key={index}
                  document={document}
                  documentIndex={index}
                />
              ))}
            </ol>
          ) : (
            <EmptyDocumentsTable setQuery={setQuery} setFilter={setFilter} />
          )}
        </div>
      </section>
    </main>
  )
}
