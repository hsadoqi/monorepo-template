import type { Metadata } from "next"
import { DocumentsIndex } from "@/components/documents/documents-index"

export const metadata: Metadata = {
  title: "Documents",
  description: "Return to active work and browse your document library.",
}

export default function DocumentsPage() {
  return <DocumentsIndex />
}
