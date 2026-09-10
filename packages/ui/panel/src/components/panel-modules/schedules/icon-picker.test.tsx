import { describe, expect, it, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { IconPicker } from "./icon-picker"

describe("IconPicker", () => {
  it("opens the icon list when the trigger is clicked", () => {
    render(<IconPicker value={undefined} onChange={vi.fn()} />)
    expect(
      screen.queryByPlaceholderText(/search icons/i)
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: /choose icon/i }))

    expect(screen.getByPlaceholderText(/search icons/i)).toBeInTheDocument()
  })

  it("filters icon options by search text", () => {
    render(<IconPicker value={undefined} onChange={vi.fn()} />)
    fireEvent.click(screen.getByRole("button", { name: /choose icon/i }))

    fireEvent.change(screen.getByPlaceholderText(/search icons/i), {
      target: { value: "team" },
    })

    expect(screen.getByRole("option", { name: /team/i })).toBeInTheDocument()
    expect(
      screen.queryByRole("option", { name: /calendar/i })
    ).not.toBeInTheDocument()
  })

  it("calls onChange with the selected icon name and closes the list", () => {
    const onChange = vi.fn()
    render(<IconPicker value={undefined} onChange={onChange} />)
    fireEvent.click(screen.getByRole("button", { name: /choose icon/i }))

    fireEvent.click(screen.getByRole("option", { name: /team/i }))

    expect(onChange).toHaveBeenCalledWith("Team")
    expect(
      screen.queryByPlaceholderText(/search icons/i)
    ).not.toBeInTheDocument()
  })
})
