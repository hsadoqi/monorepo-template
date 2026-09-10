import { z } from "zod"

export const scheduleEventItemSchema = z.object({
  id: z.string(),
  title: z.string().default("Untitled event"),
  time: z.string().default(() => "Jan 1, 1970, 00:00:00 UTC"),
  createdAt: z.number().default(() => Date.now()),
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
export const scheduleEventsPersistedStateSchema = z.object({
  entities: z.record(z.string(), scheduleEventItemSchema),
  ids: z.array(z.string()),
})

export type ScheduleEventItem = z.infer<typeof scheduleEventItemSchema>
export type ScheduleEventPersistedData = z.infer<
  typeof scheduleEventsPersistedStateSchema
>
