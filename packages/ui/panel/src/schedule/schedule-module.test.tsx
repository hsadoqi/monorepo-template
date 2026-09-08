import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { InboxIcon } from "@hugeicons/core-free-icons"
import type { ScheduleItem } from "@repo/domain-panel"
import { ScheduleModule } from "./schedule-module"

const items: ScheduleItem[] = [
  {
    id: "team-sync",
    title: "Team sync",
    time: "Today, 2:00 PM",
    icon: InboxIcon,
    iconBgClassName: "bg-primary/10",
    iconColorClassName: "text-primary",
  },
]

describe("ScheduleModule", () => {
  it("renders each upcoming item as read-only text", () => {
    render(<ScheduleModule items={items} />)
    expect(screen.getByText("Team sync")).toBeInTheDocument()
    expect(screen.getByText("Today, 2:00 PM")).toBeInTheDocument()
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })
})
