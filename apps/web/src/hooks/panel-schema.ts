import { z } from "zod"

export const noteItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.number(),
})

export const fileMetadataSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  addedAt: z.number(),
})

export const focusStateSchema = z.object({
  endTimestamp: z.number().nullable(),
  isRunning: z.boolean(),
})

export const panelPersistedStateSchema = z.object({
  isOpen: z.boolean(),
  isLocked: z.boolean(),
  activeModuleIds: z.array(z.string()),
  paneSizes: z.record(z.string(), z.number()),
  notes: z.object({ items: z.array(noteItemSchema) }),
  focus: focusStateSchema,
  files: z.object({ items: z.array(fileMetadataSchema) }),
})

export type NoteItem = z.infer<typeof noteItemSchema>
export type FileMetadata = z.infer<typeof fileMetadataSchema>
export type PanelPersistedState = z.infer<typeof panelPersistedStateSchema>
