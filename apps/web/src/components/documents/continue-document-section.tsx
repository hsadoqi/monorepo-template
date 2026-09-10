import { continuedDocument } from "@/lib/data/documents";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export const ContinueDocumentSection = () => {
  return (
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
          <p className="text-muted-foreground mt-2 max-w-2xl min-w-0 text-sm leading-6 wrap-break-word">
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
  )
}
