import type { IconSvgElement } from "@hugeicons/react"

export interface ScheduleItem {
  id: string
  title: string
  time: string
  icon: IconSvgElement
  iconBgClassName: string
  iconColorClassName: string
}
