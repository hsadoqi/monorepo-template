import { ScrollArea } from "@repo/ui-components/base/scroll-area"

export const AppContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ScrollArea
        className="h-full **:data-[slot=scroll-area-scrollbar]:hidden"
        dir="vertical"
      >
        {children}
      </ScrollArea>
    </div>
  )
}
