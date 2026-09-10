"use client";

import { Separator } from "@repo/ui-components/base/separator";
import { SidebarTrigger } from "@repo/ui-components/base/sidebar";

import { useActiveRoute } from "@/hooks/use-active-route";

export const AppHeaderNavigation = () => {
  const { title } = useActiveRoute();

  return (
    <div className="flex-1 flex items-center justify-start gap-2 w-full min-w-0">
      <SidebarTrigger size="icon-lg" />
      <Separator orientation="vertical" className="h-8" />
      <h1 className="truncate text-sm font-medium">{title}</h1>
    </div>
  )
}
