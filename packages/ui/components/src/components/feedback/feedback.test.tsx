import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, describe, expect, it } from "vitest"

import { FeedbackAlert } from "./feedback-alert"
import { FeedbackStatus } from "./feedback-status"
import { FeedbackView } from "./feedback-view"

let container: HTMLElement | undefined
let root: Root | undefined

afterEach(() => {
  act(() => root?.unmount())
  container?.remove()
  root = undefined
  container = undefined
})

function render(ui: React.ReactNode) {
  container = document.createElement("div")
  document.body.append(container)
  root = createRoot(container)
  act(() => root?.render(ui))
  return container
}

describe("FeedbackView", () => {
  it("renders page feedback with semantic content and actions", () => {
    const view = render(
      <FeedbackView
        kind="not-found"
        title="Page not found"
        description="The page may have moved."
        action={<a href="/">Go home</a>}
        placement="page"
      />
    )

    expect(view.querySelector("h1")?.textContent).toBe("Page not found")
    expect(view.textContent).toContain("The page may have moved.")
    expect(view.querySelector('a[href="/"]')).not.toBeNull()
    expect(view.querySelector('[data-kind="not-found"]')).not.toBeNull()
    expect(view.querySelector('[role="alert"]')).toBeNull()
  })

  it("marks pending feedback busy and announces it politely", () => {
    const view = render(<FeedbackView kind="loading" title="Loading" />)
    const feedback = view.querySelector('[data-slot="feedback-view"]')

    expect(feedback?.getAttribute("role")).toBe("status")
    expect(feedback?.getAttribute("aria-live")).toBe("polite")
    expect(feedback?.getAttribute("aria-busy")).toBe("true")
  })

  it("announces a completed success politely without remaining busy", () => {
    const view = render(<FeedbackView kind="success" title="Import complete" />)
    const feedback = view.querySelector('[data-slot="feedback-view"]')

    expect(feedback?.getAttribute("role")).toBe("status")
    expect(feedback?.getAttribute("aria-live")).toBe("polite")
    expect(feedback?.getAttribute("aria-busy")).toBeNull()
  })
})

describe("FeedbackStatus", () => {
  it.each([
    ["loading", "status", "polite", "true"],
    ["success", "status", "polite", null],
    ["info", "status", "polite", null],
    ["warning", "alert", "assertive", null],
    ["error", "alert", "assertive", null],
  ] as const)(
    "maps %s to the correct live-region semantics",
    (kind, role, live, busy) => {
      const view = render(<FeedbackStatus kind={kind}>Update</FeedbackStatus>)
      const status = view.querySelector('[data-slot="feedback-status"]')

      expect(status?.getAttribute("role")).toBe(role)
      expect(status?.getAttribute("aria-live")).toBe(live)
      expect(status?.getAttribute("aria-busy")).toBe(busy)
    }
  )
})

describe("FeedbackAlert", () => {
  it("keeps informational alerts polite and errors assertive", () => {
    const info = render(
      <FeedbackAlert kind="info" title="Heads up">
        A neutral update.
      </FeedbackAlert>
    )
    expect(
      info.querySelector('[data-slot="feedback-alert"]')?.getAttribute("role")
    ).toBe("status")

    act(() =>
      root?.render(<FeedbackAlert kind="error" title="Could not save" />)
    )
    expect(
      info.querySelector('[data-slot="feedback-alert"]')?.getAttribute("role")
    ).toBe("alert")
  })
})
