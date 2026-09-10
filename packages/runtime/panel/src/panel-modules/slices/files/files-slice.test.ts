import { describe, expect, it } from "vitest"
import { createFilesSlice, type FilesSlice } from "./files-slice"

function createTestSlice() {
  let state: FilesSlice
  const set = (
    partial: Partial<FilesSlice> | ((state: FilesSlice) => Partial<FilesSlice>)
  ) => {
    const next = typeof partial === "function" ? partial(state) : partial
    state = { ...state, ...next }
  }
  state = { ...createFilesSlice(set) } as FilesSlice
  return { get: () => state }
}

describe("createFilesSlice", () => {
  it("adds file metadata keyed by id", () => {
    const { get } = createTestSlice()
    get().addFileMetadata({ id: "f1", name: "notes.txt", size: 10, addedAt: 0 })
    expect(get().fileIds).toEqual(["f1"])
    expect(get().fileEntities.f1?.name).toBe("notes.txt")
  })

  it("removes file metadata", () => {
    const { get } = createTestSlice()
    get().addFileMetadata({ id: "f1", name: "notes.txt", size: 10, addedAt: 0 })
    get().removeFileMetadata("f1")
    expect(get().fileIds).toHaveLength(0)
    expect(get().fileEntities.f1).toBeUndefined()
  })
})
