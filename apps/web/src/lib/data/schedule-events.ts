import {
  Clock01FreeIcons,
  Folder02FreeIcons,
  UserGroup02FreeIcons,
} from "@hugeicons/core-free-icons"

export const UPCOMING_ITEMS = [
  {
    id: "team-sync",
    title: "Team sync",
    time: "Today, 2:00 PM",
    icon: UserGroup02FreeIcons,
    className: "bg-primary/10 text-primary",
    createdAt: Date.now() - 1000 * 60 * 60, // 1 hour ago
  },
  {
    id: "planning-review",
    title: "Planning review",
    time: "Tomorrow, 10:30 AM",
    icon: Folder02FreeIcons,
    className: "bg-secondary/10 text-secondary",
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: "weekly-reset",
    title: "Weekly reset",
    time: "Friday, 4:00 PM",
    icon: Clock01FreeIcons,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    className: "bg-accent/10 text-accent",
  },
]
