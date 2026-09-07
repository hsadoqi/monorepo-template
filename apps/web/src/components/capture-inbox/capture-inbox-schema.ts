import { z } from "zod"

export const captureTagSchema = z.enum(["task", "note", "reference"])
export const captureStatusSchema = z.enum(["unsorted", "archived"])

export const captureItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.string(),
  status: captureStatusSchema,
  tag: captureTagSchema.optional(),
})

export const captureInboxPersistedStateSchema = z.object({
  items: z.array(captureItemSchema),
})

export type CaptureTag = z.infer<typeof captureTagSchema>
export type CaptureStatus = z.infer<typeof captureStatusSchema>
export type CaptureItem = z.infer<typeof captureItemSchema>
export type CaptureInboxPersistedState = z.infer<
  typeof captureInboxPersistedStateSchema
>
