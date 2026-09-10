import type { CaptureInboxItem } from "@repo/domain-panel/capture-inbox"

export interface CaptureInboxItemsSlice {
  inboxItemEntities: Record<string, CaptureInboxItem>
  inboxItemIds: string[]
  addInboxItem: (item: CaptureInboxItem) => void
  removeInboxItem: (id: string) => void
  updateInboxItem: (id: string, updates: Partial<CaptureInboxItem>) => void
}

type SetSlice = (
  partial:
    | Partial<CaptureInboxItemsSlice>
    | ((state: CaptureInboxItemsSlice) => Partial<CaptureInboxItemsSlice>)
) => void

export const createCaptureInboxItemsSlice = (
  set: SetSlice
): CaptureInboxItemsSlice => {
  return {
    inboxItemEntities: {},
    inboxItemIds: [],
    addInboxItem: (item) =>
      set((state) => ({
        inboxItemEntities: { ...state.inboxItemEntities, [item.id]: item },
        inboxItemIds: [...state.inboxItemIds, item.id],
      })),
    removeInboxItem: (id) =>
      set((state) => {
        const { [id]: _removed, ...rest } = state.inboxItemEntities
        return {
          inboxItemEntities: rest,
          inboxItemIds: state.inboxItemIds.filter(
            (existing) => existing !== id
          ),
        }
      }),
    updateInboxItem: (id, updates) =>
      set((state) => {
        const existingItem = state.inboxItemEntities[id]
        if (!existingItem) {
          return state // Item not found, no update performed
        }
        const updatedItem = { ...existingItem, ...updates }
        return {
          inboxItemEntities: { ...state.inboxItemEntities, [id]: updatedItem },
          inboxItemIds: state.inboxItemIds,
        }
      }),
  }
}
