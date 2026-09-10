import { z } from "zod"

export const fileMetadataSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number(),
  addedAt: z.number(),
})

export const filesPersistedStateSchema = z.object({
  entities: z.record(z.string(), fileMetadataSchema),
  ids: z.array(z.string()),
})

export type FileMetadata = z.infer<typeof fileMetadataSchema>
export type FilesPersistedState = z.infer<typeof filesPersistedStateSchema>
