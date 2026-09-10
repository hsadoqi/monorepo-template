import { describe, expect, it } from "vitest"
import { createNotesSlice, type NotesSlice } from "./notes-slice"

function createTestSlice() {
  let state: NotesSlice
  const set = (
    partial: Partial<NotesSlice> | ((state: NotesSlice) => Partial<NotesSlice>)
  ) => {
    const next = typeof partial === "function" ? partial(state) : partial
    state = { ...state, ...next }
  }
  const get = () => state
  state = { ...createNotesSlice(set, get) } as NotesSlice
  return { get }
}

describe("createNotesSlice", () => {
  it("adds a note as an entity keyed by id", () => {
    const { get } = createTestSlice()
    get().addNote("Buy milk")
    const [id] = get().noteIds
    expect(id).toEqual(expect.any(String))
    expect(get().noteEntities[id!]?.text).toBe("Buy milk")
  })

  it("updates a note's text", () => {
    const { get } = createTestSlice()
    get().addNote("Buy milk")
    const [id] = get().noteIds
    get().updateNote(id!, "Buy oat milk")
    expect(get().noteEntities[id!]?.text).toBe("Buy oat milk")
  })

  it("deletes a note, removing it from both entities and ids", () => {
    const { get } = createTestSlice()
    get().addNote("Buy milk")
    const [id] = get().noteIds
    get().deleteNote(id!)
    expect(get().noteIds).toHaveLength(0)
    expect(get().noteEntities[id!]).toBeUndefined()
  })
})
