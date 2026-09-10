import { IconSvgElement } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  Home01FreeIcons,
  Note01Icon,
  PaintbrushIcon,
} from "@hugeicons/core-free-icons"

export interface SidebarGroupItem {
  label: string
  icon: IconSvgElement
  href?: string
  onClick?: () => void
}
export interface SidebarGroup {
  label: string
  items: SidebarGroupItem[]
  icon: IconSvgElement
  href: string
}

export type NavItem = SidebarGroupItem & { href: string }

export const items: NavItem[] = [
  { label: "Overview", icon: Home01FreeIcons, href: "/" },
  { label: "Theme system", icon: PaintbrushIcon, href: "/" },
]

export const groups: SidebarGroup[] = [
  {
    label: "Documents",
    icon: Note01Icon,
    items: items,
    href: "/documents",
  },
  {
    label: "Dashboards",
    icon: DashboardSquare01Icon,
    items: items,
    href: "/dashboards",
  },
]
