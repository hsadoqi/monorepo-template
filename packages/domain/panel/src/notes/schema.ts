import { z } from "zod"

export const noteItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.number(),
})

/**
 * Canonical entity-collection shape (entities keyed by id, plus an ordered
 * id list) rather than a flat array. This is deliberately forward-compatible
 * with a future canonical/shared-entity model, where multiple instances
 * (a panel module, a widget, a dashboard) could reference the same notes by
 * id instead of each instance privately owning its own copy — see
 * `.docs/product-vision.md`. No such sharing exists yet; this only shapes
 * the data so that migration isn't a breaking change later.
 */
export const notesPersistedStateSchema = z.object({
  entities: z.record(z.string(), noteItemSchema),
  ids: z.array(z.string()),
})

export type NoteItem = z.infer<typeof noteItemSchema>
export type NotesPersistedState = z.infer<typeof notesPersistedStateSchema>
