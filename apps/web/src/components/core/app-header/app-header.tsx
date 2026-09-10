import { AppHeaderActions } from "./actions/app-header-actions"
import { AppHeaderNavigation } from "./app-header-navigation"

export const AppHeader = () => {
  return (
    <header className="bg-background/90 supports-backdrop-filter:bg-background/75 sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b px-4 backdrop-blur-md">
      <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
        <AppHeaderNavigation />
        <AppHeaderActions />
      </div>
    </header>
  )
}
