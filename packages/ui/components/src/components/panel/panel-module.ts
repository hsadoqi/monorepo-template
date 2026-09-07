import type { IconSvgElement } from "@hugeicons/react"

export interface PanelModule {
  id: string
  label: string
  icon: IconSvgElement
  Content: React.ComponentType
}
