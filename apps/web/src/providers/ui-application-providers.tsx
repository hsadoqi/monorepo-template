"use client"

import { createContext, useContext } from "react"
import { TooltipProvider } from "@repo/ui-components/base/tooltip"
import { SidebarProvider } from "@repo/ui-components/base/sidebar"
import { FeedbackToaster } from "@repo/ui-components/components/feedback"

const UiApplicationContext = createContext<{
  status: "idle" | "loading" | "error"
}>({
  status: "idle",
})

export const UiApplicationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <UiApplicationContext.Provider value={{ status: "idle" }}>
      <TooltipProvider>
        <SidebarProvider>{children}</SidebarProvider>
        <FeedbackToaster />
      </TooltipProvider>
    </UiApplicationContext.Provider>
  )
}

export const useUiApplicationStore = () => useContext(UiApplicationContext)
