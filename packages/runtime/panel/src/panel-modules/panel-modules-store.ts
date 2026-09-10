"use client"

import { createStore } from "zustand"
import { useStore } from "zustand/react"
import { persist } from "zustand/middleware"
import { createPersistOptions, getLocalStorage } from "@repo/services-zustand"
import { z } from "zod"
import {
  createNotesSlice,
  type NotesSlice,
  createFocusSlice,
  type FocusSlice,
  createFilesSlice,
  type FilesSlice,
  createSchedulesSlice,
  type SchedulesSlice,
  createCaptureInboxItemsSlice,
  type CaptureInboxItemsSlice,
} from "./slices"

import { modulesPersistedStateSchema } from "./panel-modules-store.schema"

export interface ModulesState
  extends
    NotesSlice,
    FocusSlice,
    FilesSlice,
    SchedulesSlice,
    CaptureInboxItemsSlice {}

type ModulesPersistedState = z.infer<typeof modulesPersistedStateSchema>

const DEFAULT_PERSISTED_STATE: ModulesPersistedState = {
  notes: { entities: {}, ids: [] },
  focus: { endTimestamp: null, isRunning: false },
  files: { entities: {}, ids: [] },
  schedules: { entities: {}, ids: [] },
  inbox: { entities: {}, ids: [] },
}

export function createModulesStore(version: number) {
  return createStore<ModulesState>()(
    persist(
      (set, get) => ({
        ...createNotesSlice(set, get),
        ...createFocusSlice(set),
        ...createFilesSlice(set),
        ...createSchedulesSlice(set),
        ...createCaptureInboxItemsSlice(set),
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
          inbox: {
            entities: state.inboxItemEntities,
            ids: state.inboxItemIds,
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
              inboxItemEntities: {},
              inboxItemIds: [],
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
            inboxItemEntities: result.data.inbox.entities,
            inboxItemIds: result.data.inbox.ids,
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
