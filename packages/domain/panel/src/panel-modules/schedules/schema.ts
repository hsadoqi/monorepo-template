import { z } from "zod"

export const scheduleEventItemSchema = z.object({
  id: z.string(),
  title: z.string().default("Untitled event"),
  time: z.string().default(() => "Jan 1, 1970, 00:00:00 UTC"),
  className: z.string().optional(),
  icon: z.string().optional(),
  createdAt: z.number().default(() => Date.now()),
})
export const scheduleEventsPersistedStateSchema = z.object({
  entities: z.record(z.string(), scheduleEventItemSchema),
  ids: z.array(z.string()),
})

export type ScheduleEventItem = z.infer<typeof scheduleEventItemSchema>
export type ScheduleEventPersistedData = z.infer<
  typeof scheduleEventsPersistedStateSchema
>
