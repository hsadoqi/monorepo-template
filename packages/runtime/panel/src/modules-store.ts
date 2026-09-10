"use client"

import { createStore } from "zustand"
import { useStore } from "zustand/react"
import { persist } from "zustand/middleware"
import { createPersistOptions, getLocalStorage } from "@repo/services-zustand"
import { z } from "zod"

import { notesPersistedStateSchema } from "@repo/domain-panel/notes"
import { focusPersistedStateSchema } from "@repo/domain-panel/focus"
import { filesPersistedStateSchema } from "@repo/domain-panel/files"
import { scheduleEventsPersistedStateSchema } from "@repo/domain-panel/schedules"
import { createNotesSlice, type NotesSlice } from "./notes/notes-slice"
import { createFocusSlice, type FocusSlice } from "./focus/focus-slice"
import { createFilesSlice, type FilesSlice } from "./files/files-slice"
import {
  createSchedulesSlice,
  type SchedulesSlice,
} from "./schedule/schedule-slice"

/**
 * Consolidated store for panel module content (Notes, Focus, Files).
 *
 * Each module's logic lives in its own slice-creator function
 * (createNotesSlice/createFocusSlice/createFilesSlice) so it stays
 * independently readable/testable/movable — composing them into one store
 * here is what actually uses the slices pattern for something; a slice used
 * in only its own store would just be a store with an extra name for it.
 *
 * This is separate from the panel shell store (open/lock/active modules/
 * pane sizes) in @repo/runtime-panel's `store.ts` — module content and
 * panel layout are unrelated concerns with no reason to share a persistence
 * key or rehydrate together.
 */
export interface ModulesState
  extends NotesSlice, FocusSlice, FilesSlice, SchedulesSlice {}

const modulesPersistedStateSchema = z.object({
  notes: notesPersistedStateSchema,
  focus: focusPersistedStateSchema,
  files: filesPersistedStateSchema,
  schedules: scheduleEventsPersistedStateSchema,
})

type ModulesPersistedState = z.infer<typeof modulesPersistedStateSchema>

const DEFAULT_PERSISTED_STATE: ModulesPersistedState = {
  notes: { entities: {}, ids: [] },
  focus: { endTimestamp: null, isRunning: false },
  files: { entities: {}, ids: [] },
  schedules: { entities: {}, ids: [] },
}

export function createModulesStore(version: number) {
  return createStore<ModulesState>()(
    persist(
      (set, get) => ({
        ...createNotesSlice(set, get),
        ...createFocusSlice(set),
        ...createFilesSlice(set),
        ...createSchedulesSlice(set),
      }),
      createPersistOptions<ModulesState, ModulesPersistedState>({
        name: "panel-modules-store",
        version,
        getStorage: getLocalStorage,
        migrate: (persistedState) => {
          const result = modulesPersistedStateSchema.safeParse(persistedState)
          if (!result.success) {
            console.warn("Failed to restore panel modules state:", result.error)
            return DEFAULT_PERSISTED_STATE
          }
          return result.data
        },
        partialize: (state) => ({
          notes: { entities: state.noteEntities, ids: state.noteIds },
          focus: {
            endTimestamp: state.endTimestamp,
            isRunning: state.isRunning,
          },
          files: { entities: state.fileEntities, ids: state.fileIds },
          schedules: {
            entities: state.scheduleEntities,
            ids: state.scheduleIds,
          },
        }),
        merge: (persistedState, currentState) => {
          if (persistedState == null) return currentState
          const result = modulesPersistedStateSchema.safeParse(persistedState)
          if (!result.success) {
            console.warn("Failed to restore panel modules state:", result.error)
            return {
              ...currentState,
              noteEntities: {},
              noteIds: [],
              fileEntities: {},
              fileIds: [],
              endTimestamp: null,
              isRunning: false,
              scheduleEntities: {},
              scheduleIds: [],
            }
          }
          return {
            ...currentState,
            noteEntities: result.data.notes.entities,
            noteIds: result.data.notes.ids,
            fileEntities: result.data.files.entities,
            fileIds: result.data.files.ids,
            endTimestamp: result.data.focus.endTimestamp,
            isRunning: result.data.focus.isRunning,
            scheduleEntities: result.data.schedules.entities,
            scheduleIds: result.data.schedules.ids,
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    )
  )
}

/** Vanilla store — use for non-React code and tests. */
export const modulesStore = createModulesStore(1)

/** React hook wrapper — component call-sites use this like a bound zustand hook. */
export function useModulesStore<T>(selector: (state: ModulesState) => T): T {
  return useStore(modulesStore, selector)
}
