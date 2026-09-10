"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { SidebarInset } from "@repo/ui-components/base/sidebar"
import { AppHeader } from "./app-header"
import { AppSidebar } from "./app-sidebar/app-sidebar"
import { AppContent } from "./app-content"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type PanelImperativeHandle,
} from "@repo/ui-components/base/resizable"
import { usePanelStore } from "@repo/runtime-panel"

const GlobalPanel = dynamic(
  () => import("@/components/global-panel").then((mod) => mod.GlobalPanel),
  { ssr: false }
)

export default function AppShell({ children }: { children: React.ReactNode }) {
  const globalPanelRef = useRef<PanelImperativeHandle>(null)
  const mainPanelRef = useRef(null)
  const isOpen = usePanelStore((state) => state.isOpen)
  const panelSizes = usePanelStore((state) => state.panelSizes)
  const setPanelSizes = usePanelStore((state) => state.setPanelSizes)

  // The panel must push content down/up (FR-002), not sit permanently open
  // at a fixed height, so collapse state is driven imperatively off `isOpen`
  // rather than relying on `defaultSize` (which only applies on first mount).
  useEffect(() => {
    const panel = globalPanelRef.current
    if (!panel) return
    if (isOpen) {
      panel.expand()
    } else {
      panel.collapse()
    }
  }, [isOpen])

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <AppContent>
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel
              panelRef={globalPanelRef}
              collapsible
              collapsedSize={0}
              defaultSize={isOpen ? (panelSizes.global ?? "30%") : 0}
              minSize={"20%"}
              maxSize={"60%"}
              onResize={(size) => {
                if (size.inPixels > 0) {
                  setPanelSizes({ ...panelSizes, global: size.inPixels })
                }
              }}
            >
              <GlobalPanel />
            </ResizablePanel>
            <ResizableHandle withHandle dir="vertical" />
            <ResizablePanel
              panelRef={mainPanelRef}
              defaultSize={"70%"}
              minSize={"40%"}
            >
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </AppContent>
      </SidebarInset>
    </>
  )
}
