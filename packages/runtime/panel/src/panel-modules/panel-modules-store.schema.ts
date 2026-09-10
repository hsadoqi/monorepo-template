import {
  captureInboxPersistedStateSchema,
  filesPersistedStateSchema,
  focusPersistedStateSchema,
  notesPersistedStateSchema,
  scheduleEventsPersistedStateSchema,
} from "@repo/domain-panel"
import { z } from "zod"

export const modulesPersistedStateSchema = z.object({
  notes: notesPersistedStateSchema,
  focus: focusPersistedStateSchema,
  files: filesPersistedStateSchema,
  schedules: scheduleEventsPersistedStateSchema,
  inbox: captureInboxPersistedStateSchema.default({ entities: {}, ids: [] }),
})
