import { beforeEach, describe, expect, it } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { renderWithModulesStore } from "../../../test-utils/render-with-modules-store"
import { createModulesStore, type ModulesStoreApi } from "@repo/runtime-panel"
import { SchedulesModule } from "./schedules-module"

let modulesStore: ModulesStoreApi

beforeEach(() => {
  modulesStore = createModulesStore(1)
})

describe("ScheduleModule", () => {
  it("adds an event when the form is submitted", () => {
    renderWithModulesStore(<SchedulesModule />, modulesStore)
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
    renderWithModulesStore(<SchedulesModule />, modulesStore)
    fireEvent.change(screen.getByLabelText(/event title/i), {
      target: { value: "Team sync" },
    })
    fireEvent.click(screen.getByRole("button", { name: /add event/i }))
    expect(modulesStore.getState().scheduleIds).toHaveLength(0)
  })

  it("adds an event with a picked icon", () => {
    renderWithModulesStore(<SchedulesModule />, modulesStore)
    fireEvent.change(screen.getByLabelText(/event title/i), {
      target: { value: "Team sync" },
    })
    fireEvent.change(screen.getByLabelText(/event time/i), {
      target: { value: "Today, 2:00 PM" },
    })
    fireEvent.click(screen.getByRole("button", { name: /choose icon/i }))
    fireEvent.click(screen.getByRole("option", { name: /^team$/i }))
    fireEvent.click(screen.getByRole("button", { name: /add event/i }))

    const [id] = modulesStore.getState().scheduleIds
    expect(modulesStore.getState().scheduleEntities[id!]?.icon).toBe("Team")
  })

  it("deletes an event", () => {
    modulesStore.getState().addScheduleEvent("Team sync", "Today, 2:00 PM")
    renderWithModulesStore(<SchedulesModule />, modulesStore)
    fireEvent.click(screen.getByRole("button", { name: /delete team sync/i }))
    expect(screen.queryByText("Team sync")).not.toBeInTheDocument()
  })
})
