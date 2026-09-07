import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import { useCaptureInboxStore } from "@/components/capture-inbox/use-capture-inbox-store"
import { QuickCaptureCard } from "./quick-capture-card"

describe("QuickCaptureCard", () => {
  beforeEach(() => {
    localStorage.clear()
    useCaptureInboxStore.setState({ items: [] }, false)
  })

  it("captures text on Enter and clears the input", () => {
    render(<QuickCaptureCard />)
    const input = screen.getByPlaceholderText("What needs your attention?")

    fireEvent.change(input, { target: { value: "Buy milk" } })
    fireEvent.keyDown(input, { key: "Enter" })

    expect(useCaptureInboxStore.getState().items).toHaveLength(1)
    expect(useCaptureInboxStore.getState().items[0]?.text).toBe("Buy milk")
    expect(input).toHaveValue("")
  })

  it("captures text when the Capture button is clicked", () => {
    render(<QuickCaptureCard />)
    const input = screen.getByPlaceholderText("What needs your attention?")

    fireEvent.change(input, { target: { value: "Call dentist" } })
    fireEvent.click(screen.getByRole("button", { name: "Capture" }))

    expect(useCaptureInboxStore.getState().items).toHaveLength(1)
  })

  it("does not capture empty or whitespace-only text", () => {
    render(<QuickCaptureCard />)
    const input = screen.getByPlaceholderText("What needs your attention?")

    fireEvent.change(input, { target: { value: "   " } })
    fireEvent.keyDown(input, { key: "Enter" })

    expect(useCaptureInboxStore.getState().items).toHaveLength(0)
  })

  it("shows a derived unsorted count instead of a hardcoded one", () => {
    useCaptureInboxStore.getState().capture("Buy milk")
    useCaptureInboxStore.getState().capture("Call dentist")

    render(<QuickCaptureCard />)

    expect(screen.getByText("2 unsorted items")).toBeInTheDocument()
  })

  it("shows singular copy for exactly one unsorted item", () => {
    useCaptureInboxStore.getState().capture("Buy milk")

    render(<QuickCaptureCard />)

    expect(screen.getByText("1 unsorted item")).toBeInTheDocument()
  })
})
