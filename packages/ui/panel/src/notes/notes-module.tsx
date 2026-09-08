"use client"

import { useState } from "react"
import { Input } from "@repo/ui-components/base/input"
import { Button } from "@repo/ui-components/base/button"
import { useModulesStore } from "@repo/runtime-panel"

export function NotesModule() {
  const noteIds = useModulesStore((state) => state.noteIds)
  const noteEntities = useModulesStore((state) => state.noteEntities)
  const addNote = useModulesStore((state) => state.addNote)
  const deleteNote = useModulesStore((state) => state.deleteNote)
  const [draft, setDraft] = useState("")

  return (
    <div className="flex flex-col gap-3">
      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          if (!draft.trim()) return
          addNote(draft.trim())
          setDraft("")
        }}
      >
        <Input
          aria-label="New note"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Jot something down"
        />
        <Button type="submit" size="sm">
          Add note
        </Button>
      </form>
      <ul className="flex flex-col gap-2">
        {noteIds.map((id) => {
          const note = noteEntities[id]
          if (!note) return null
          return (
            <li
              key={note.id}
              className="flex items-center justify-between gap-2"
            >
              <span className="text-sm">{note.text}</span>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Delete ${note.text}`}
                onClick={() => deleteNote(note.id)}
              >
                ×
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
