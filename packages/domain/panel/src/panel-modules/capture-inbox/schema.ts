import { z } from "zod"

export const captureTypeSchema = z.enum(["task", "note", "reference"])
export const captureStatusSchema = z.enum(["unsorted", "archived", "sorted"])

export const captureInboxItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  status: captureStatusSchema.optional().default("unsorted"),
  type: captureTypeSchema.optional(),
  createdAt: z.number().default(() => Date.now()),
})

export const captureInboxPersistedStateSchema = z.object({
  entities: z.record(z.string(), captureInboxItemSchema),
  ids: z.array(z.string()),
})

export const captureInboxItemTypes = ["task", "note", "reference"] as const
export const captureInboxItemStatuses = [
  "unsorted",
  "archived",
  "sorted",
] as const
export type CaptureInboxItemType = z.infer<typeof captureTypeSchema>
export type CaptureInboxItemStatus = z.infer<typeof captureStatusSchema>
export type CaptureInboxItem = z.infer<typeof captureInboxItemSchema>
export type CaptureInboxPersistedState = z.infer<
  typeof captureInboxPersistedStateSchema
>
