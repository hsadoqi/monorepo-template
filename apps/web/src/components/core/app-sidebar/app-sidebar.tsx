"use client"

import {
  Sidebar,
  SidebarRail,
  useSidebar,
} from "@repo/ui-components/base/sidebar"
import { AppSidebarHeader } from "./app-sidebar-header"
import { AppSidebarContent } from "./app-sidebar-content"
import { useClickOutside } from "@/hooks"
import { useRef } from "react"
import { AppSidebarFooter } from "./app-sidebar-footer"

export const AppSidebar = () => {
  const sidebarRef = useRef(null)
  const { open, toggleSidebar } = useSidebar()

  useClickOutside(
    sidebarRef,
    () => {
      if (!open) return
      if (open) toggleSidebar()
    },
    {
      enabled: true,
    }
  )
  return (
    <Sidebar ref={sidebarRef} side="left" variant="sidebar" collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
