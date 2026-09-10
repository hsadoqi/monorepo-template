"use client"

import { SidebarInset } from "@repo/ui-components/base/sidebar"
import { GlobalPanel } from "@/components/panel/global-panel"
import { AppHeader } from "./app-header"
import { AppSidebar } from "./app-sidebar/app-sidebar"
import { AppContent } from "./app-content"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <AppContent>
          <GlobalPanel />
          {children}
        </AppContent>
      </SidebarInset>
    </>
  )
}
