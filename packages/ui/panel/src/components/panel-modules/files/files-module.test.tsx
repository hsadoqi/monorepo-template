import "fake-indexeddb/auto"
import { beforeEach, describe, expect, it } from "vitest"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { renderWithModulesStore } from "../../../test-utils/render-with-modules-store"
import { createModulesStore, type ModulesStoreApi } from "@repo/runtime-panel"
import { FilesModule } from "./files-module"

let modulesStore: ModulesStoreApi

beforeEach(() => {
  modulesStore = createModulesStore(1)
})

function makeFile(name: string, sizeBytes: number): File {
  return new File([new Uint8Array(sizeBytes)], name)
}

describe("FilesModule", () => {
  it("adds a file under the size limit and lists it", async () => {
    renderWithModulesStore(<FilesModule />, modulesStore)
    const input = screen.getByLabelText(/add file/i)
    fireEvent.change(input, {
      target: { files: [makeFile("notes.txt", 1024)] },
    })
    await waitFor(() =>
      expect(screen.getByText("notes.txt")).toBeInTheDocument()
    )
  })

  it("rejects a file over 5MB with an inline message", async () => {
    renderWithModulesStore(<FilesModule />, modulesStore)
    const input = screen.getByLabelText(/add file/i)
    fireEvent.change(input, {
      target: { files: [makeFile("huge.bin", 6 * 1024 * 1024)] },
    })
    await waitFor(() =>
      expect(screen.getByText(/exceeds the 5MB limit/i)).toBeInTheDocument()
    )
    expect(screen.queryByText("huge.bin")).not.toBeInTheDocument()
  })

  it("removes a file", async () => {
    renderWithModulesStore(<FilesModule />, modulesStore)
    const input = screen.getByLabelText(/add file/i)
    fireEvent.change(input, { target: { files: [makeFile("notes.txt", 10)] } })
    await waitFor(() =>
      expect(screen.getByText("notes.txt")).toBeInTheDocument()
    )

    fireEvent.click(screen.getByRole("button", { name: /remove notes.txt/i }))
    await waitFor(() =>
      expect(screen.queryByText("notes.txt")).not.toBeInTheDocument()
    )
  })
})
