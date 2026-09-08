import "fake-indexeddb/auto"
import { beforeEach, describe, expect, it } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { modulesStore } from "@repo/runtime-panel"
import { FilesModule } from "./files-module"

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

function makeFile(name: string, sizeBytes: number): File {
  return new File([new Uint8Array(sizeBytes)], name)
}

describe("FilesModule", () => {
  it("adds a file under the size limit and lists it", async () => {
    render(<FilesModule />)
    const input = screen.getByLabelText(/add file/i)
    fireEvent.change(input, { target: { files: [makeFile("notes.txt", 1024)] } })
    await waitFor(() => expect(screen.getByText("notes.txt")).toBeInTheDocument())
  })

  it("rejects a file over 5MB with an inline message", async () => {
    render(<FilesModule />)
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
    render(<FilesModule />)
    const input = screen.getByLabelText(/add file/i)
    fireEvent.change(input, { target: { files: [makeFile("notes.txt", 10)] } })
    await waitFor(() => expect(screen.getByText("notes.txt")).toBeInTheDocument())

    fireEvent.click(screen.getByRole("button", { name: /remove notes.txt/i }))
    await waitFor(() =>
      expect(screen.queryByText("notes.txt")).not.toBeInTheDocument()
    )
  })
})
