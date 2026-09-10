import { beforeEach, describe, expect, it } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { renderWithModulesStore } from "../../../test-utils/render-with-modules-store"
import { createModulesStore, type ModulesStoreApi } from "@repo/runtime-panel"
import { NotesModule } from "./notes-module"

let modulesStore: ModulesStoreApi

beforeEach(() => {
  modulesStore = createModulesStore(1)
})

describe("NotesModule", () => {
  it("adds a note when the form is submitted", () => {
    renderWithModulesStore(<NotesModule />, modulesStore)
    fireEvent.change(screen.getByLabelText(/new note/i), {
      target: { value: "Buy milk" },
    })
    fireEvent.click(screen.getByRole("button", { name: /add note/i }))
    expect(screen.getByText("Buy milk")).toBeInTheDocument()
    expect(modulesStore.getState().noteIds).toHaveLength(1)
  })

  it("does not add an empty note", () => {
    renderWithModulesStore(<NotesModule />, modulesStore)
    fireEvent.click(screen.getByRole("button", { name: /add note/i }))
    expect(modulesStore.getState().noteIds).toHaveLength(0)
  })

  it("deletes a note", () => {
    modulesStore.getState().addNote("Existing note")
    renderWithModulesStore(<NotesModule />, modulesStore)
    fireEvent.click(
      screen.getByRole("button", { name: /delete existing note/i })
    )
    expect(screen.queryByText("Existing note")).not.toBeInTheDocument()
  })
})
