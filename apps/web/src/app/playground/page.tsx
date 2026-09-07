"use client"

import { ResizableDrawerWrapper } from "@/components/resizable-drawer-wrapper"

export default function PlaygroundPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ResizableDrawerWrapper
        panelOne={<div className="text-center">Panel One</div>}
        panelTwo={<div className="text-center">Panel Two</div>}
      />
    </div>
  )
}
