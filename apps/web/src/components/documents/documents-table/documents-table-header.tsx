export const DocumentsTableHeader = () => {
  return (
    <div className="text-muted-foreground border-border hidden grid-cols-[3.5rem_minmax(16rem,1fr)_minmax(8rem,0.35fr)_8rem_5rem] border-b text-[0.6875rem] lg:grid">
      <span className="border-border border-r px-3 py-2.5 text-right">
        Index
      </span>
      <span className="px-5 py-2.5">Document</span>
      <span className="px-4 py-2.5">Context</span>
      <span className="px-4 py-2.5">Modified</span>
      <span className="px-3 py-2.5 text-right">Words</span>
    </div>
  )
}
