import { describe, expect, it, vi } from "vitest"
import { render, fireEvent } from "@testing-library/react"
import { useRef } from "react"
import { usePanelDismiss } from "./use-panel-dismiss"

function TestHarness({
  enabled,
  onDismiss,
}: {
  enabled: boolean
  onDismiss: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  usePanelDismiss({ enabled, onDismiss, panelRef: ref })
  return (
    <div>
      <div ref={ref} data-testid="panel">
        panel
      </div>
      <button data-testid="outside">outside</button>
    </div>
  )
}

describe("usePanelDismiss", () => {
  it("calls onDismiss on outside click when enabled", () => {
    const onDismiss = vi.fn()
    const { getByTestId } = render(
      <TestHarness enabled onDismiss={onDismiss} />
    )
    fireEvent.mouseDown(getByTestId("outside"))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it("calls onDismiss on Escape when enabled", () => {
    const onDismiss = vi.fn()
    render(<TestHarness enabled onDismiss={onDismiss} />)
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it("does not call onDismiss when disabled (locked)", () => {
    const onDismiss = vi.fn()
    const { getByTestId } = render(
      <TestHarness enabled={false} onDismiss={onDismiss} />
    )
    fireEvent.mouseDown(getByTestId("outside"))
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onDismiss).not.toHaveBeenCalled()
  })
})
