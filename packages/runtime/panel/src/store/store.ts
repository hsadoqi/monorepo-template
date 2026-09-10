"use client"

import { createStore } from "zustand"
import { persist } from "zustand/middleware"
import { createPersistOptions, getLocalStorage } from "@repo/services-zustand"

import {
  panelPersistedStateSchema,
  type PanelPersistedState,
} from "@repo/domain-panel/schema"

/**
 * Pure panel-shell state: which modules are shown and how, whether the
 * panel is open/locked. Module content (Notes, Files, capture-inbox, ...)
 * owns its own store — this store never holds module data.
 */
export interface PanelState extends PanelPersistedState {
  open: () => void
  close: () => void
  toggleOpen: () => void
  toggleLock: () => void
  setPanelSizes: (sizes: Record<string, number>) => void
  toggleModuleVisibility: (id: string) => void
  reorderModule: (id: string, direction: "up" | "down") => void
  setActiveModuleId: (id: string) => void
}

const DEFAULT_PERSISTED_STATE: PanelPersistedState = {
  isOpen: false,
  isLocked: false,
  moduleIds: [
    "overview",
    "notes",
    "files",
    "schedules",
    "focus",
    "capture-inbox",
  ],
  panelSizes: {},
  activeModuleId: "overview",
}

function moveId(ids: string[], id: string, direction: "up" | "down"): string[] {
  const index = ids.indexOf(id)
  if (index === -1) return ids
  const swapWith = direction === "up" ? index - 1 : index + 1
  if (swapWith < 0 || swapWith >= ids.length) return ids
  const next = [...ids]
  ;[next[index], next[swapWith]] = [next[swapWith]!, next[index]!]
  return next
}

export function createPanelStore(version: number) {
  return createStore<PanelState>()(
    persist(
      (set) => {
        function safeSet(
          partial:
            Partial<PanelState> | ((state: PanelState) => Partial<PanelState>)
        ) {
          try {
            set(partial)
          } catch (error) {
            console.warn("Failed to persist panel state:", error)
          }
        }

        return {
          ...DEFAULT_PERSISTED_STATE,

          open: () => safeSet({ isOpen: true }),
          close: () => safeSet({ isOpen: false }),
          toggleOpen: () => safeSet((state) => ({ isOpen: !state.isOpen })),
          toggleLock: () => safeSet((state) => ({ isLocked: !state.isLocked })),
          setPanelSizes: (sizes) => safeSet({ panelSizes: sizes }),
          toggleModuleVisibility: (id) =>
            safeSet((state) => ({
              moduleIds: state.moduleIds.includes(id)
                ? state.moduleIds.filter((existing) => existing !== id)
                : [...state.moduleIds, id],
            })),
          reorderModule: (id, direction) =>
            safeSet((state) => ({
              moduleIds: moveId(state.moduleIds, id, direction),
            })),
          setActiveModuleId: (id) => safeSet({ activeModuleId: id }),
        }
      },
      createPersistOptions<PanelState, PanelPersistedState>({
        name: "panel-store",
        version,
        getStorage: getLocalStorage,
        migrate: (persistedState, persistedVersion) => {
          const result = panelPersistedStateSchema.safeParse(persistedState)
          if (!result.success) {
            console.warn("Failed to restore panel state:", result.error)
            return DEFAULT_PERSISTED_STATE
          }
          const moduleIds =
            persistedVersion < 2 && result.data.moduleIds.length === 0
              ? DEFAULT_PERSISTED_STATE.moduleIds
              : result.data.moduleIds

          return {
            ...result.data,
            moduleIds:
              moduleIds.length > 0 && !moduleIds.includes("overview")
                ? ["overview", ...moduleIds]
                : moduleIds,
            activeModuleId:
              persistedVersion < 2 && !result.data.activeModuleId
                ? DEFAULT_PERSISTED_STATE.activeModuleId
                : result.data.activeModuleId,
          }
        },
        partialize: (state) => ({
          isOpen: state.isOpen,
          isLocked: state.isLocked,
          moduleIds: state.moduleIds,
          panelSizes: state.panelSizes,
          activeModuleId: state.activeModuleId,
        }),
        merge: (persistedState, currentState) => {
          if (persistedState == null) return currentState
          const result = panelPersistedStateSchema.safeParse(persistedState)
          if (!result.success) {
            console.warn("Failed to restore panel state:", result.error)
            return currentState
          }
          return { ...currentState, ...result.data }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    )
  )
}
