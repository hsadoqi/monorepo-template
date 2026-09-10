import { SidebarMenuButton } from "@repo/ui-components/base/sidebar"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"
import { IconButton } from "@repo/ui-components"

export const QuickCreateSidebarButton = ({
  icon,
  label = "Quick Create",
  onClick,
}: {
  icon: IconSvgElement
  label?: string
  onClick: () => void
}) => {
  return (
    <SidebarMenuButton
      tooltip={{ children: label, hidden: false }}
      className="hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground w-8 shrink-0 duration-200 ease-linear"
      size="default"
      onClick={onClick}
      render={
        <IconButton label={label} variant={"ghost"} tooltipSide="right">
          <HugeiconsIcon icon={icon} />
        </IconButton>
      }
    />
  )
}
