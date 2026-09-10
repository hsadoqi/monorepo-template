import type { NoteItem } from "@repo/domain-panel/notes"

export interface NotesSlice {
  noteEntities: Record<string, NoteItem>
  noteIds: string[]
  addNote: (text: string) => void
  updateNote: (id: string, text: string) => void
  deleteNote: (id: string) => void
}

type SetSlice = (
  partial: Partial<NotesSlice> | ((state: NotesSlice) => Partial<NotesSlice>)
) => void

export function createNotesSlice(
  set: SetSlice,
  get: () => NotesSlice
): NotesSlice {
  return {
    noteEntities: {},
    noteIds: [],

    addNote: (text: string) => {
      const id = crypto.randomUUID()
      const note: NoteItem = { id, text, createdAt: Date.now() }
      set((state) => ({
        noteEntities: { ...state.noteEntities, [id]: note },
        noteIds: [...state.noteIds, id],
      }))
    },
    updateNote: (id: string, text: string) => {
      const existing = get().noteEntities[id]
      if (!existing) return
      set((state) => ({
        noteEntities: { ...state.noteEntities, [id]: { ...existing, text } },
      }))
    },
    deleteNote: (id: string) => {
      set((state) => {
        const { [id]: _removed, ...rest } = state.noteEntities
        return {
          noteEntities: rest,
          noteIds: state.noteIds.filter((existing) => existing !== id),
        }
      })
    },
  }
}
