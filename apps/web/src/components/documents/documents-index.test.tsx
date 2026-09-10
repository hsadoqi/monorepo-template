import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { DocumentsIndex } from "./documents-index"

describe("DocumentsIndex", () => {
  it("filters documents by search text and clears an empty result", () => {
    render(<DocumentsIndex />)

    fireEvent.change(screen.getByLabelText("Search documents"), {
      target: { value: "connected data" },
    })

    expect(
      screen.getByRole("link", { name: /Connected data principles/ })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("link", { name: /September field notes/ })
    ).not.toBeInTheDocument()
    expect(screen.getByText("1 of 5 documents")).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText("Search documents"), {
      target: { value: "no document has this phrase" },
    })

    expect(screen.getByText("No matching documents")).toBeInTheDocument()
    fireEvent.click(
      screen.getByRole("button", { name: "Clear search and filters" })
    )
    expect(screen.getByText("5 of 5 documents")).toBeInTheDocument()
  })

  it("filters the register by document status", () => {
    render(<DocumentsIndex />)

    fireEvent.click(screen.getByRole("button", { name: "Draft" }))

    expect(screen.getByRole("button", { name: "Draft" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
    expect(
      screen.getByRole("link", { name: /Document workbench notes/ })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("link", { name: /Reading map: tools for thought/ })
    ).not.toBeInTheDocument()
    expect(screen.getByText("1 of 5 documents")).toBeInTheDocument()
  })
})
