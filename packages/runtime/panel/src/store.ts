"use client"

import { createStore } from "zustand"
import { useStore } from "zustand/react"
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
  setPaneSizes: (sizes: Record<string, number>) => void
  toggleModuleVisibility: (id: string) => void
  reorderModule: (id: string, direction: "up" | "down") => void
}

const DEFAULT_PERSISTED_STATE: PanelPersistedState = {
  isOpen: false,
  isLocked: false,
  activeModuleIds: [],
  paneSizes: {},
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
          setPaneSizes: (sizes) => safeSet({ paneSizes: sizes }),
          toggleModuleVisibility: (id) =>
            safeSet((state) => ({
              activeModuleIds: state.activeModuleIds.includes(id)
                ? state.activeModuleIds.filter((existing) => existing !== id)
                : [...state.activeModuleIds, id],
            })),
          reorderModule: (id, direction) =>
            safeSet((state) => ({
              activeModuleIds: moveId(state.activeModuleIds, id, direction),
            })),
        }
      },
      createPersistOptions<PanelState, PanelPersistedState>({
        name: "panel-store",
        version,
        getStorage: getLocalStorage,
        migrate: (persistedState) => {
          const result = panelPersistedStateSchema.safeParse(persistedState)
          if (!result.success) {
            console.warn("Failed to restore panel state:", result.error)
            return DEFAULT_PERSISTED_STATE
          }
          return result.data
        },
        partialize: (state) => ({
          isOpen: state.isOpen,
          isLocked: state.isLocked,
          activeModuleIds: state.activeModuleIds,
          paneSizes: state.paneSizes,
        }),
        merge: (persistedState, currentState) => {
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

/** Vanilla store — use for non-React code and tests (getState/setState/persist.rehydrate). */
export const panelStore = createPanelStore(1)

/** React hook wrapper — component call-sites use this exactly like a bound zustand hook. */
export function usePanelStore<T>(selector: (state: PanelState) => T): T {
  return useStore(panelStore, selector)
}
