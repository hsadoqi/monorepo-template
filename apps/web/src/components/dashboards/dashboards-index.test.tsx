import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { DashboardsIndex } from "./dashboards-index"

describe("DashboardsIndex", () => {
  it("searches the dashboard collection and clears an empty result", () => {
    render(<DashboardsIndex />)

    fireEvent.change(screen.getByLabelText("Search dashboards"), {
      target: { value: "books" },
    })

    expect(
      screen.getByRole("link", { name: /Reading room/ })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("link", { name: /Synapcity build/ })
    ).not.toBeInTheDocument()
    expect(screen.getByText("1 of 4 dashboards")).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText("Search dashboards"), {
      target: { value: "nothing matches this" },
    })

    expect(screen.getByText("No matching dashboards")).toBeInTheDocument()
    fireEvent.click(
      screen.getByRole("button", { name: "Clear search and filters" })
    )
    expect(screen.getByText("4 of 4 dashboards")).toBeInTheDocument()
  })

  it("filters dashboards by context and exposes the selected filter", () => {
    render(<DashboardsIndex />)

    fireEvent.click(screen.getByRole("button", { name: "Projects" }))

    expect(screen.getByRole("button", { name: "Projects" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
    expect(
      screen.getByRole("link", { name: /Synapcity build/ })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("link", { name: /Wellbeing rhythm/ })
    ).not.toBeInTheDocument()
    expect(screen.getByText("1 of 4 dashboards")).toBeInTheDocument()
  })
})
