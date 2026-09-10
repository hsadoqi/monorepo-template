import { z } from "zod"

export const panelPersistedStateSchema = z.object({
  isOpen: z.boolean(),
  isLocked: z.boolean(),
  activeModuleIds: z.array(z.string()),
  panelSizes: z.record(z.string(), z.number()),
})

export type PanelPersistedState = z.infer<typeof panelPersistedStateSchema>
