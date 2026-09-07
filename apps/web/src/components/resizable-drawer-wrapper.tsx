"use client"

import type { Ref } from "react"
import {
  GroupImperativeHandle,
  PanelImperativeHandle,
  PanelSize,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui-components/base/resizable"
import { Button } from "@repo/ui-components"
import React from "react"

export type ResizableDrawerWrapperProps = {
  panelOne: React.ReactNode
  panelTwo: React.ReactNode
}

export type ResizableDrawerWrapperState = {
  id?: string
  isOpen: boolean
  orientation?: "horizontal" | "vertical"
  defaultSize?: ResizableSize
  onLayoutChanged?: (sizes: ResizableSize[]) => void
  disableCursor?: boolean
  groupRf?: Ref<GroupImperativeHandle> | null
  defaultLayout?: ResizableSize
}
// panelRef?: Ref<PanelImperativeHandle | null>
// Exposes the following imperative API:

// collapse(): void
// expand(): void
// getSize(): number
// isCollapsed(): boolean
// resize(size: number): void
// The usePanelRef and usePanelCallbackRef hooks are exported for convenience use in TypeScript projects
//
// "data-orientation"?: "horizontal" | "vertical";
// How should this Panel behave if the parent Group is resized? Defaults to preserve-relative-size.
// (At least one panel must have `preserve-relative-size` to ensure that the Group can be resized.)
// preserve-relative-size: Retain the current relative size (as a percentage of the Group)
// preserve-pixel-size: Retain its current size (in pixels)

export type ResizableSize = string | number | "0%"
// Number is pixels
// String is percentage
// Use excplicit units for another interpretation, e.g. "50px" or "50%"

export type ResizablePanelState = {
  groupResizeBehavior?:
    "preserve-relative-size" | "preserve-pixel-size" | "preserve-ratio"
  id?: string
  collapsible?: boolean
  collapsedSize?: ResizableSize
  onResize?:
    | ((
        panelSize: ResizableSize,
        id: string | number,
        prevPanelSize: ResizableSize | undefined
      ) => void)
    | undefined
  panelRef?: Ref<PanelImperativeHandle | null>

  // Called when panel sizes change.

  // panelSize Panel size (both as a percentage of the parent Group and in pixels)
  // id Panel id (if one was provided as a prop)
  // prevPanelSize Previous panel size (will be undefined on mount)
  minSize?: ResizableSize
  maxSize?: ResizableSize
  defaultSize?: ResizableSize
}

export type ResizableSeparatorState = {
  disabled?: boolean
  className?: string
  disableCursor?: boolean
}
export const ResizableDrawerWrapper = ({
  panelOne,
  panelTwo,
}: ResizableDrawerWrapperProps) => {
  const [isOpen, setIsOpen] = React.useState(true)
  const panelRef = React.useRef<PanelImperativeHandle | null>(null)

  const panelTwoRef = React.useRef<PanelImperativeHandle | null>(null)
  const handleCollapse = () => {
    setIsOpen(false)
    panelRef.current?.collapse()
    panelTwoRef.current?.resize("100%")
  }

  const handleExpand = (prevPanel: number | undefined) => {
    const remainingSize = 100 - Number(prevPanel || 0)
    setIsOpen(true)
    panelRef.current?.expand()
    // panelTwoRef.current?.resize();
  }

  return (
    <ResizablePanelGroup
      id={"demo-group"}
      orientation="vertical"
      className="flex size-full flex-1 flex-col"
    >
      {isOpen ? (
        <ResizablePanel
          panelRef={panelRef}
          id={"panel-1"}
          defaultSize={"30%"}
          minSize={"10%"}
          maxSize={"75%"}
          collapsedSize={"0%"}
          collapsible
          onResize={(
            panelSize: PanelSize,
            id: string | number | undefined,
            prevPanelSize: PanelSize | undefined
          ) => handleExpand(prevPanelSize?.asPercentage)}
        >
          <div className="flex h-full items-center justify-center p-6">
            <Button
              className="mb-2"
              onClick={
                isOpen ? () => handleCollapse() : () => handleExpand(undefined)
              }
            >
              {isOpen ? "Collapse Me!" : "Expand Me!"}
            </Button>
            {panelOne}
          </div>
        </ResizablePanel>
      ) : (
        <Button
          className="mb-2"
          onClick={
            isOpen ? () => handleCollapse() : () => handleExpand(undefined)
          }
        >
          {isOpen ? "Collapse Me!" : "Expand Me!"}
        </Button>
      )}
      <ResizableHandle
        withHandle={isOpen}
        disabled={!isOpen}
        aria-disabled={!isOpen}
      />

      <ResizablePanel
        panelRef={panelTwoRef}
        defaultSize="70%"
        id={"panel-2"}
        minSize={"25%"}
      >
        <div className="flex h-full items-center justify-center p-6">
          {panelTwo}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
