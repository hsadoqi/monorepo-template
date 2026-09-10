import { beforeEach, describe, expect, it } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { modulesStore } from "@repo/runtime-panel"
import { NotesModule } from "./notes-module"

beforeEach(() => {
  modulesStore.setState(
    {
      noteEntities: {},
      noteIds: [],
      endTimestamp: null,
      isRunning: false,
      fileEntities: {},
      fileIds: [],
    },
    false
  )
})

describe("NotesModule", () => {
  it("adds a note when the form is submitted", () => {
    render(<NotesModule />)
    fireEvent.change(screen.getByLabelText(/new note/i), {
      target: { value: "Buy milk" },
    })
    fireEvent.click(screen.getByRole("button", { name: /add note/i }))
    expect(screen.getByText("Buy milk")).toBeInTheDocument()
    expect(modulesStore.getState().noteIds).toHaveLength(1)
  })

  it("does not add an empty note", () => {
    render(<NotesModule />)
    fireEvent.click(screen.getByRole("button", { name: /add note/i }))
    expect(modulesStore.getState().noteIds).toHaveLength(0)
  })

  it("deletes a note", () => {
    modulesStore.getState().addNote("Existing note")
    render(<NotesModule />)
    fireEvent.click(
      screen.getByRole("button", { name: /delete existing note/i })
    )
    expect(screen.queryByText("Existing note")).not.toBeInTheDocument()
  })
})
