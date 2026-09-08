"use client"

import { createStore } from "zustand"
import { useStore } from "zustand/react"
import { persist } from "zustand/middleware"
import { createPersistOptions } from "@repo/services-zustand"

import {
  panelPersistedStateSchema,
  type NoteItem,
  type FileMetadata,
  type PanelPersistedState,
} from "./panel-schema"

export interface PanelState extends PanelPersistedState {
  open: () => void
  close: () => void
  toggleOpen: () => void
  toggleLock: () => void
  setPaneSizes: (sizes: Record<string, number>) => void
  toggleModuleVisibility: (id: string) => void
  reorderModule: (id: string, direction: "up" | "down") => void

  addNote: (text: string) => void
  updateNote: (id: string, text: string) => void
  deleteNote: (id: string) => void

  startFocus: (durationMs: number) => void
  pauseFocus: () => void
  resetFocus: () => void

  addFileMetadata: (meta: FileMetadata) => void
  removeFileMetadata: (id: string) => void
}

const DEFAULT_PERSISTED_STATE: PanelPersistedState = {
  isOpen: false,
  isLocked: false,
  activeModuleIds: [],
  paneSizes: {},
  notes: { items: [] },
  focus: { endTimestamp: null, isRunning: false },
  files: { items: [] },
}

function getPanelStorage() {
  if (typeof window === "undefined") return undefined
  try {
    const probe = "__panel_storage_test__"
    window.localStorage.setItem(probe, probe)
    window.localStorage.removeItem(probe)
    return window.localStorage
  } catch {
    return undefined
  }
}

function moveId(
  ids: string[],
  id: string,
  direction: "up" | "down"
): string[] {
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
            | Partial<PanelState>
            | ((state: PanelState) => Partial<PanelState>)
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
          toggleLock: () =>
            safeSet((state) => ({ isLocked: !state.isLocked })),
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

          addNote: (text) =>
            safeSet((state) => ({
              notes: {
                items: [
                  ...state.notes.items,
                  { id: crypto.randomUUID(), text, createdAt: Date.now() },
                ],
              },
            })),
          updateNote: (id, text) =>
            safeSet((state) => ({
              notes: {
                items: state.notes.items.map((note) =>
                  note.id === id ? { ...note, text } : note
                ),
              },
            })),
          deleteNote: (id) =>
            safeSet((state) => ({
              notes: {
                items: state.notes.items.filter((note) => note.id !== id),
              },
            })),

          startFocus: (durationMs) =>
            safeSet({
              focus: {
                endTimestamp: Date.now() + durationMs,
                isRunning: true,
              },
            }),
          pauseFocus: () =>
            safeSet((state) => ({
              focus: { ...state.focus, isRunning: false },
            })),
          resetFocus: () =>
            safeSet({ focus: { endTimestamp: null, isRunning: false } }),

          addFileMetadata: (meta) =>
            safeSet((state) => ({
              files: { items: [...state.files.items, meta] },
            })),
          removeFileMetadata: (id) =>
            safeSet((state) => ({
              files: {
                items: state.files.items.filter((file) => file.id !== id),
              },
            })),
        }
      },
      createPersistOptions<PanelState, PanelPersistedState>({
        name: "panel-store",
        version,
        getStorage: getPanelStorage,
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
          notes: state.notes,
          focus: state.focus,
          files: state.files,
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

export type { NoteItem, FileMetadata }
