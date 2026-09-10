import { IconSvgElement } from "@hugeicons/react"

export * from "./capture-inbox"
export * from "./files"
export * from "./focus"
export * from "./notes"
export * from "./schedules"

export interface PanelModule {
  id: string
  label: string
  icon: IconSvgElement
  Content: React.ComponentType
}
