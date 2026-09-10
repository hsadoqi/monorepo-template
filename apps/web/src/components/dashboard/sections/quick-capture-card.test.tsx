import { act, fireEvent, render, screen, within } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { type CaptureInboxItem, modulesStore } from "@repo/runtime-panel"

import { QuickCaptureCard } from "./quick-capture-card"

const CAPTURE_ID = "00000000-0000-4000-8000-000000000001"
const CAPTURED_AT = new Date("2026-09-10T12:00:00.000Z").getTime()

function createInboxItem(
  overrides: Partial<CaptureInboxItem> = {}
): CaptureInboxItem {
  return {
    id: "capture-1",
    text: "Plan tomorrow",
    status: "unsorted",
    createdAt: CAPTURED_AT,
    ...overrides,
  }
}

function seedInbox(items: CaptureInboxItem[]) {
  act(() => {
    modulesStore.setState({
      inboxItemEntities: Object.fromEntries(
        items.map((item) => [item.id, item])
      ),
      inboxItemIds: items.map((item) => item.id),
    })
  })
}

describe("QuickCaptureCard", () => {
  beforeEach(() => {
    localStorage.clear()
    seedInbox([])
    vi.spyOn(crypto, "randomUUID").mockReturnValue(CAPTURE_ID)
    vi.spyOn(Date, "now").mockReturnValue(CAPTURED_AT)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders the empty capture form with an accessible collapsed review", () => {
    render(<QuickCaptureCard />)

    expect(
      screen.getByRole("heading", { name: "Quick capture" })
    ).toBeInTheDocument()
    expect(
      screen.getByText("Get it out of your head. Sort it later.")
    ).toBeInTheDocument()
    expect(screen.getByLabelText("Capture a thought")).toHaveAttribute(
      "placeholder",
      "What needs your attention?"
    )
    expect(screen.getByText("Press Enter to save")).toBeInTheDocument()
    expect(screen.getByText("0 unsorted items")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Review" })).toHaveAttribute(
      "aria-expanded",
      "false"
    )
    expect(screen.queryByText("Nothing to sort")).not.toBeInTheDocument()
  })

  it("captures a trimmed thought from the button and opens review", () => {
    render(<QuickCaptureCard />)
    const input = screen.getByLabelText("Capture a thought")

    fireEvent.change(input, { target: { value: "  Book dentist  " } })
    fireEvent.click(screen.getByRole("button", { name: "Capture" }))

    expect(input).toHaveValue("")
    expect(screen.getByText("1 unsorted item")).toBeInTheDocument()
    expect(screen.getByText("Book dentist")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Review" })).toHaveAttribute(
      "aria-expanded",
      "true"
    )
    expect(modulesStore.getState().inboxItemEntities[CAPTURE_ID]).toEqual({
      id: CAPTURE_ID,
      text: "Book dentist",
      status: "unsorted",
      createdAt: CAPTURED_AT,
    })
  })

  it("captures a thought when Enter is pressed", () => {
    render(<QuickCaptureCard />)
    const input = screen.getByLabelText("Capture a thought")

    fireEvent.change(input, { target: { value: "Follow up with Sam" } })
    fireEvent.keyDown(input, { key: "Enter" })

    expect(screen.getByText("Follow up with Sam")).toBeInTheDocument()
    expect(screen.getByText("1 unsorted item")).toBeInTheDocument()
    expect(input).toHaveValue("")
  })

  it("ignores empty and whitespace-only captures", () => {
    render(<QuickCaptureCard />)
    const input = screen.getByLabelText("Capture a thought")

    fireEvent.click(screen.getByRole("button", { name: "Capture" }))
    fireEvent.change(input, { target: { value: "   " } })
    fireEvent.keyDown(input, { key: "Enter" })

    expect(modulesStore.getState().inboxItemIds).toEqual([])
    expect(crypto.randomUUID).not.toHaveBeenCalled()
    expect(screen.getByText("0 unsorted items")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Review" })).toHaveAttribute(
      "aria-expanded",
      "false"
    )
  })

  it("toggles review and shows its empty state", () => {
    render(<QuickCaptureCard />)
    const reviewButton = screen.getByRole("button", { name: "Review" })

    fireEvent.click(reviewButton)
    expect(reviewButton).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("Nothing to sort")).toBeInTheDocument()

    fireEvent.click(reviewButton)
    expect(reviewButton).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByText("Nothing to sort")).not.toBeInTheDocument()
  })

  it("counts and reviews only unsorted items in store order", () => {
    seedInbox([
      createInboxItem({ id: "first", text: "First thought" }),
      createInboxItem({
        id: "archived",
        text: "Already handled",
        status: "archived",
      }),
      createInboxItem({ id: "second", text: "Second thought" }),
    ])
    render(<QuickCaptureCard />)

    expect(screen.getByText("2 unsorted items")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Review" }))

    expect(screen.getByText("First thought")).toBeInTheDocument()
    expect(screen.getByText("Second thought")).toBeInTheDocument()
    expect(screen.queryByText("Already handled")).not.toBeInTheDocument()
    expect(
      screen.getByRole("button", {
        name: 'Item 1: Archive ("First thought")',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", {
        name: 'Item 2: Archive ("Second thought")',
      })
    ).toBeInTheDocument()
  })

  it.each(["task", "note", "reference"] as const)(
    "changes an unsorted item type to %s",
    (type) => {
      const item = createInboxItem()
      seedInbox([item])
      render(<QuickCaptureCard />)
      fireEvent.click(screen.getByRole("button", { name: "Review" }))

      fireEvent.click(
        screen.getByRole("button", {
          name: `Item 1: Change type to ${type} ("${item.text}")`,
        })
      )

      expect(modulesStore.getState().inboxItemEntities[item.id]?.type).toBe(
        type
      )
      expect(screen.getByText(item.text)).toBeInTheDocument()
    }
  )

  it("archives an item and updates the visible review", () => {
    const item = createInboxItem()
    seedInbox([item])
    render(<QuickCaptureCard />)
    fireEvent.click(screen.getByRole("button", { name: "Review" }))

    fireEvent.click(
      screen.getByRole("button", {
        name: `Item 1: Archive ("${item.text}")`,
      })
    )

    expect(modulesStore.getState().inboxItemEntities[item.id]?.status).toBe(
      "archived"
    )
    expect(screen.getByText("0 unsorted items")).toBeInTheDocument()
    expect(screen.queryByText(item.text)).not.toBeInTheDocument()
    expect(screen.getByText("Nothing to sort")).toBeInTheDocument()
  })

  it("deletes an item from the inbox", () => {
    const item = createInboxItem()
    seedInbox([item])
    render(<QuickCaptureCard />)
    fireEvent.click(screen.getByRole("button", { name: "Review" }))

    const row = screen.getByText(item.text).parentElement
    expect(row).not.toBeNull()
    fireEvent.click(
      within(row!).getByRole("button", {
        name: `Item 1: Delete ("${item.text}")`,
      })
    )

    expect(modulesStore.getState().inboxItemIds).toEqual([])
    expect(modulesStore.getState().inboxItemEntities[item.id]).toBeUndefined()
    expect(screen.getByText("0 unsorted items")).toBeInTheDocument()
    expect(screen.getByText("Nothing to sort")).toBeInTheDocument()
  })
})
