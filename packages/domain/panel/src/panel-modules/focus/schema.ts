import { z } from "zod"

export const focusPersistedStateSchema = z.object({
  endTimestamp: z.number().nullable(),
  isRunning: z.boolean(),
})

export type FocusPersistedState = z.infer<typeof focusPersistedStateSchema>
