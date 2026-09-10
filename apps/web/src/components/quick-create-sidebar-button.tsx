import { SidebarMenuButton } from "@repo/ui-components/base/sidebar"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

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
      tooltip="Quick Create"
      className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
      onClick={onClick}
    >
      <HugeiconsIcon icon={icon} />
      <span>{label}</span>
    </SidebarMenuButton>
  )
}
