import { HugeiconsIcon } from "@hugeicons/react"
import type { ScheduleItem } from "@repo/domain-panel"

export interface ScheduleModuleProps {
  items: ScheduleItem[]
}

export function ScheduleModule({ items }: ScheduleModuleProps) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3">
          <div
            className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-md ${item.iconBgClassName} ${item.iconColorClassName}`}
          >
            <HugeiconsIcon icon={item.icon} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">{item.title}</span>
            <span className="text-muted-foreground text-xs">{item.time}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
