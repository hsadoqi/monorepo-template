import { beforeEach, describe, expect, it } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { modulesStore } from "@repo/runtime-panel"
import { ScheduleModule } from "./schedule-module"

beforeEach(() => {
  modulesStore.setState(
    {
      noteEntities: {},
      noteIds: [],
      endTimestamp: null,
      isRunning: false,
      fileEntities: {},
      fileIds: [],
      scheduleEntities: {},
      scheduleIds: [],
    },
    false
  )
})

describe("ScheduleModule", () => {
  it("adds an event when the form is submitted", () => {
    render(<ScheduleModule />)
    fireEvent.change(screen.getByLabelText(/event title/i), {
      target: { value: "Team sync" },
    })
    fireEvent.change(screen.getByLabelText(/event time/i), {
      target: { value: "Today, 2:00 PM" },
    })
    fireEvent.click(screen.getByRole("button", { name: /add event/i }))

    expect(screen.getByText("Team sync")).toBeInTheDocument()
    expect(screen.getByText("Today, 2:00 PM")).toBeInTheDocument()
    expect(modulesStore.getState().scheduleIds).toHaveLength(1)
  })

  it("does not add an event missing a title or time", () => {
    render(<ScheduleModule />)
    fireEvent.change(screen.getByLabelText(/event title/i), {
      target: { value: "Team sync" },
    })
    fireEvent.click(screen.getByRole("button", { name: /add event/i }))
    expect(modulesStore.getState().scheduleIds).toHaveLength(0)
  })

  it("deletes an event", () => {
    modulesStore.getState().addScheduleEvent("Team sync", "Today, 2:00 PM")
    render(<ScheduleModule />)
    fireEvent.click(screen.getByRole("button", { name: /delete team sync/i }))
    expect(screen.queryByText("Team sync")).not.toBeInTheDocument()
  })
})
