import { ScrollArea } from "@repo/ui-components/base/scroll-area";

export const AppContent = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div className="flex-1 flex flex-col min-h-0 px-4 py-6">
      <ScrollArea className="h-full">
        {children}
      </ScrollArea>
    </div>
  )
}
