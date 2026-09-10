import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"

import { QuickCaptureCard } from "./quick-capture-card"
import { useCaptureInboxStore } from "@repo/runtime-panel"

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

  it("shows an empty state when Review is opened with nothing unsorted", () => {
    render(<QuickCaptureCard />)

    fireEvent.click(screen.getByRole("button", { name: "Review" }))

    expect(screen.getByText("Nothing to sort")).toBeInTheDocument()
  })

  it("lists unsorted items when Review is opened", () => {
    useCaptureInboxStore.getState().capture("Buy milk")

    render(<QuickCaptureCard />)
    fireEvent.click(screen.getByRole("button", { name: "Review" }))

    expect(screen.getByText("Buy milk")).toBeInTheDocument()
  })

  it("tags an item and removes it from the unsorted list", () => {
    useCaptureInboxStore.getState().capture("Buy milk")

    render(<QuickCaptureCard />)
    fireEvent.click(screen.getByRole("button", { name: "Review" }))
    fireEvent.click(
      screen.getByRole("button", {
        name: 'Item 1: Tag as task ("Buy milk")',
      })
    )

    expect(useCaptureInboxStore.getState().items[0]).toMatchObject({
      status: "archived",
      tag: "task",
    })
    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument()
    expect(screen.getByText("Nothing to sort")).toBeInTheDocument()
  })

  it("archives an item without a tag", () => {
    useCaptureInboxStore.getState().capture("Buy milk")

    render(<QuickCaptureCard />)
    fireEvent.click(screen.getByRole("button", { name: "Review" }))
    fireEvent.click(
      screen.getByRole("button", { name: 'Item 1: Archive ("Buy milk")' })
    )

    expect(useCaptureInboxStore.getState().items[0]).toMatchObject({
      status: "archived",
      tag: undefined,
    })
  })

  it("deletes an item entirely", () => {
    useCaptureInboxStore.getState().capture("Buy milk")

    render(<QuickCaptureCard />)
    fireEvent.click(screen.getByRole("button", { name: "Review" }))
    fireEvent.click(
      screen.getByRole("button", { name: 'Item 1: Delete ("Buy milk")' })
    )

    expect(useCaptureInboxStore.getState().items).toHaveLength(0)
  })

  it("gives items with identical text distinct accessible names in the triage list", () => {
    useCaptureInboxStore.getState().capture("Buy milk")
    useCaptureInboxStore.getState().capture("Buy milk")

    render(<QuickCaptureCard />)
    fireEvent.click(screen.getByRole("button", { name: "Review" }))

    expect(
      screen.getByRole("button", { name: 'Item 1: Archive ("Buy milk")' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: 'Item 2: Archive ("Buy milk")' })
    ).toBeInTheDocument()
  })

  it("restores previously captured items after a reload (rehydration)", async () => {
    // Seed localStorage directly, as if a previous session had already
    // persisted this item, without going through the live store instance
    // (calling the store's own setState/capture here would immediately
    // re-persist and mask what we're testing).
    localStorage.setItem(
      "capture-inbox-store",
      JSON.stringify({
        state: {
          items: [
            {
              id: "seeded-1",
              text: "Buy milk",
              createdAt: "2026-09-07T12:00:00.000Z",
              status: "unsorted",
            },
          ],
        },
        version: 1,
      })
    )

    render(<QuickCaptureCard />)

    await waitFor(() => {
      expect(screen.getByText("1 unsorted item")).toBeInTheDocument()
    })
  })
})
