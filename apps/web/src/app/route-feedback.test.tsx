import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, describe, expect, it, vi } from "vitest"

import ErrorPage from "./error"
import Loading from "./loading"
import NotFound from "./not-found"

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

describe("route feedback", () => {
  it("renders a polite busy loading state", () => {
    const view = render(<Loading />)
    const feedback = view.querySelector('[data-slot="feedback-view"]')

    expect(feedback?.getAttribute("role")).toBe("status")
    expect(feedback?.getAttribute("aria-busy")).toBe("true")
  })

  it("retries through the reset function supplied by Next.js", () => {
    const reset = vi.fn()
    const view = render(<ErrorPage reset={reset} />)

    act(() => view.querySelector("button")?.click())
    expect(reset).toHaveBeenCalledOnce()
  })

  it("offers a path home from the not-found screen", () => {
    const view = render(<NotFound />)

    expect(view.querySelector('a[href="/"]')?.textContent).toContain(
      "Return to the theme lab"
    )
  })
})
