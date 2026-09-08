import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { InboxIcon } from "@hugeicons/core-free-icons"
import type { ScheduleItem } from "@repo/domain-panel"
import { createScheduleModule } from "./create-schedule-module"

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

describe("createScheduleModule", () => {
  it("builds a PanelModule with the schedule id/label/icon and renders the given items", () => {
    const module = createScheduleModule(items)
    expect(module.id).toBe("schedule")
    expect(module.label).toBe("Schedule")

    const { Content } = module
    render(<Content />)
    expect(screen.getByText("Team sync")).toBeInTheDocument()
  })
})
