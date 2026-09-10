"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"

import {
  groups,
  items,
  type NavItem,
  type SidebarGroup,
} from "@/lib/data/navigation"

const ROOT_TITLE = "Overview"

const normalizeHref = (href: string) => href.replace(/\/+$/, "") || "/"

export const isActiveRoute = (href: string, pathname: string) =>
  normalizeHref(href) === normalizeHref(pathname)

const humanizeSegment = (segment: string) =>
  segment
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word[0]!.toUpperCase() + word.slice(1))
    .join(" ")

export const resolvePageTitle = (
  pathname: string,
  navItems: NavItem[] = items
) => {
  const match = navItems.find((item) => isActiveRoute(item.href, pathname))
  if (match) return match.label

  const lastSegment = pathname.split("/").filter(Boolean).at(-1)
  return lastSegment ? humanizeSegment(lastSegment) : ROOT_TITLE
}

export const resolveActiveGroup = (
  pathname: string,
  navGroups: SidebarGroup[] = groups
) =>
  navGroups.find(
    (group) =>
      group.href === pathname.split("/")[0] &&
      isActiveRoute(group.href, pathname)
  )?.label ?? "Synapcity"

export const useActiveRoute = () => {
  const pathname = usePathname()
  const title = useMemo(() => resolvePageTitle(pathname), [pathname])
  const activeGroup = useMemo(() => resolveActiveGroup(pathname), [pathname])
  const routeGroups = groups.map((group) => group.label)

  return {
    pathname,
    title,
    isActive: (href: string) => isActiveRoute(href, pathname),
    routeGroups,
    activeGroup,
  }
}
