import type { ScheduleEventItem } from "@repo/domain-panel/schedules"

export interface SchedulesSlice {
  scheduleEntities: Record<string, ScheduleEventItem>
  scheduleIds: string[]
  addScheduleEvent: (title: string, time: string, icon?: string) => void
  deleteScheduleEvent: (id: string) => void
}

type SetSlice = (
  partial:
    | Partial<SchedulesSlice>
    | ((state: SchedulesSlice) => Partial<SchedulesSlice>)
) => void

export function createSchedulesSlice(set: SetSlice): SchedulesSlice {
  return {
    scheduleEntities: {},
    scheduleIds: [],

    addScheduleEvent: (title, time, icon) => {
      const id = crypto.randomUUID()
      const event: ScheduleEventItem = {
        id,
        title,
        time,
        icon,
        createdAt: Date.now(),
      }
      set((state) => ({
        scheduleEntities: { ...state.scheduleEntities, [id]: event },
        scheduleIds: [...state.scheduleIds, id],
      }))
    },
    deleteScheduleEvent: (id) =>
      set((state) => {
        const { [id]: _removed, ...rest } = state.scheduleEntities
        return {
          scheduleEntities: rest,
          scheduleIds: state.scheduleIds.filter((existing) => existing !== id),
        }
      }),
  }
}
