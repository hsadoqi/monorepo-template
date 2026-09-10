import type { ScheduleEventItem } from "@repo/domain-panel"

export const UPCOMING_ITEMS: ScheduleEventItem[] = [
  {
    id: "team-sync",
    title: "Team sync",
    time: "Today, 2:00 PM",
    icon: "user-group",
    className: "bg-primary/10 text-primary",
    createdAt: Date.now() - 1000 * 60 * 60, // 1 hour ago
  },
  {
    id: "planning-review",
    title: "Planning review",
    time: "Tomorrow, 10:30 AM",
    icon: "folder-02",
    className: "bg-secondary/10 text-secondary",
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: "weekly-reset",
    title: "Weekly reset",
    time: "Friday, 4:00 PM",
    icon: "clock-01",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    className: "bg-accent/10 text-accent",
  },
]
