import type { IconSvgElement } from "@hugeicons/react"
import {
  Calendar03Icon,
  CalendarLove02Icon,
  Clock01Icon,
  Clock02Icon,
  AlarmClockIcon,
  Timer02Icon,
  UserGroupIcon,
  User03Icon,
  UserMultiple02Icon,
  Call02Icon,
  VideoReplayIcon,
  Mail01Icon,
  MessageMultiple02Icon,
  Briefcase01Icon,
  Folder02Icon,
  TaskDone02Icon,
  CheckmarkCircle02Icon,
  Target02Icon,
  Flag02Icon,
  FlashIcon,
  StarIcon,
  SparklesIcon,
  Airplane01Icon,
  Location01Icon,
  Home01Icon,
  Building02Icon,
  Coffee02Icon,
  RestaurantIcon,
  Book02Icon,
  Idea01Icon,
  PaintBoardIcon,
  MusicNote01Icon,
  Dumbbell02Icon,
  Medicine02Icon,
  ShoppingCart01Icon,
} from "@hugeicons/core-free-icons"

export interface ScheduleIconOption {
  name: string
  icon: IconSvgElement
}

export const SCHEDULE_ICON_OPTIONS: readonly ScheduleIconOption[] = [
  { name: "Calendar", icon: Calendar03Icon },
  { name: "Calendar love", icon: CalendarLove02Icon },
  { name: "Clock", icon: Clock01Icon },
  { name: "Clock alt", icon: Clock02Icon },
  { name: "Alarm", icon: AlarmClockIcon },
  { name: "Timer", icon: Timer02Icon },
  { name: "Team", icon: UserGroupIcon },
  { name: "Person", icon: User03Icon },
  { name: "People", icon: UserMultiple02Icon },
  { name: "Call", icon: Call02Icon },
  { name: "Video call", icon: VideoReplayIcon },
  { name: "Mail", icon: Mail01Icon },
  { name: "Message", icon: MessageMultiple02Icon },
  { name: "Work", icon: Briefcase01Icon },
  { name: "Project", icon: Folder02Icon },
  { name: "Task done", icon: TaskDone02Icon },
  { name: "Checklist", icon: CheckmarkCircle02Icon },
  { name: "Goal", icon: Target02Icon },
  { name: "Flag", icon: Flag02Icon },
  { name: "Quick", icon: FlashIcon },
  { name: "Star", icon: StarIcon },
  { name: "Sparkles", icon: SparklesIcon },
  { name: "Travel", icon: Airplane01Icon },
  { name: "Location", icon: Location01Icon },
  { name: "Home", icon: Home01Icon },
  { name: "Office", icon: Building02Icon },
  { name: "Coffee", icon: Coffee02Icon },
  { name: "Food", icon: RestaurantIcon },
  { name: "Reading", icon: Book02Icon },
  { name: "Idea", icon: Idea01Icon },
  { name: "Design", icon: PaintBoardIcon },
  { name: "Music", icon: MusicNote01Icon },
  { name: "Workout", icon: Dumbbell02Icon },
  { name: "Health", icon: Medicine02Icon },
  { name: "Shopping", icon: ShoppingCart01Icon },
]

const DEFAULT_SCHEDULE_ICON = Clock01Icon

export function resolveScheduleIcon(key: string | undefined): IconSvgElement {
  if (!key) return DEFAULT_SCHEDULE_ICON
  const match = SCHEDULE_ICON_OPTIONS.find((option) => option.name === key)
  return match?.icon ?? DEFAULT_SCHEDULE_ICON
}
