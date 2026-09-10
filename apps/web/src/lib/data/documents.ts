export type DocumentStatus = "Draft" | "Reference" | "Living document"

export interface DocumentSummary {
  id: string
  title: string
  excerpt: string
  context: string
  updated: string
  words: string
  status: DocumentStatus
}

export const continuedDocument: DocumentSummary = {
  id: "ai-strategy-brief",
  title: "AI strategy brief",
  excerpt:
    "A working position on assistive intelligence, durable context, and the boundaries of automation.",
  context: "Synapcity",
  updated: "Today, 4:18 PM",
  words: "2,840",
  status: "Living document",
}

export const documents: DocumentSummary[] = [
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

export const filters = ["All", "Living document", "Draft", "Reference"] as const
export type Filter = (typeof filters)[number]
