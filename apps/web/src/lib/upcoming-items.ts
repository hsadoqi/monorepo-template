import {
  UserGroupIcon,
  Folder02Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons"
import type { ScheduleItem } from "@repo/domain-panel"

export const UPCOMING_ITEMS: ScheduleItem[] = [
  {
    id: "team-sync",
    title: "Team sync",
    time: "Today, 2:00 PM",
    icon: UserGroupIcon,
    iconBgClassName: "bg-primary/10",
    iconColorClassName: "text-primary",
  },
  {
    id: "planning-review",
    title: "Planning review",
    time: "Tomorrow, 10:30 AM",
    icon: Folder02Icon,
    iconBgClassName: "bg-accent/15",
    iconColorClassName: "text-accent-foreground",
  },
  {
    id: "weekly-reset",
    title: "Weekly reset",
    time: "Friday, 4:00 PM",
    icon: Clock01Icon,
    iconBgClassName: "bg-muted",
    iconColorClassName: "text-muted-foreground",
  },
]
