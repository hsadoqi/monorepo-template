"use client"

import { SidebarInset } from "@repo/ui-components/base/sidebar"
import { AppContentHeader } from "./app-content-header"
import { AppSidebar } from "./app-sidebar"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-0 flex-1 flex-col">
          <AppContentHeader />
          {children}
        </div>
      </SidebarInset>
    </>
  )
}
