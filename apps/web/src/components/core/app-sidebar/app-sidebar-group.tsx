"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup as SidebarGroupRoot,
} from "@repo/ui-components/base/sidebar"
import Link from "next/link"
import { useActiveRoute } from "@/hooks/use-active-route"
import { type SidebarGroup, type SidebarGroupItem } from "@/lib/data/navigation"
import { QuickCreateSidebarButton } from "./quick-create-sidebar-button"

export const AppSidebarGroup = ({ group }: { group: SidebarGroup }) => {
  const handleCreate = () => {
    // eslint-disable-next-line no-console
    console.log("trigger create:", group.label)
  }

  const formatQuickCreateLabel = () => {
    const singleLabel = group.label.endsWith("s")
      ? group.label.slice(0, -1)
      : group.label
    return `Create New ${singleLabel}`
  }
  return (
    <SidebarGroupRoot className="p-0">
      <SidebarGroupLabel className="text-muted-foreground/70 flex items-center justify-between pl-2 text-[10px] font-medium tracking-[0.12em] uppercase">
        <span className="flex-1">{group.label}</span>
        <QuickCreateSidebarButton
          label={formatQuickCreateLabel()}
          icon={group.icon}
          onClick={handleCreate}
        />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <AppSidebarGroupItem key={item.label} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroupRoot>
  )
}

const AppSidebarGroupItem = ({ item }: { item: SidebarGroupItem }) => {
  const { isActive } = useActiveRoute()

  return (
    <SidebarMenuItem key={item.label}>
      <SidebarMenuButton
        className="h-9 text-sm font-medium"
        render={<Link href={String(item.href)} />}
        tooltip={item.label}
        isActive={item.href ? isActive(item.href) : false}
      >
        <HugeiconsIcon icon={item.icon} strokeWidth={2} />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
