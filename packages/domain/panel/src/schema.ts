import { z } from "zod"

export const panelPersistedStateSchema = z.object({
  isOpen: z.boolean(),
  isLocked: z.boolean(),
  moduleIds: z.array(z.string()),
  panelSizes: z.record(z.string(), z.number()),
  activeModuleId: z.string().optional(),
})

export type PanelPersistedState = z.infer<typeof panelPersistedStateSchema>
