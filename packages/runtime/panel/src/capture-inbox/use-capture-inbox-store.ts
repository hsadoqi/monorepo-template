"use client"

import { createStore, Mutate } from "zustand"
import { persist, StateStorage } from "zustand/middleware"
import { createPersistOptions, getLocalStorage } from "@repo/services-zustand"

import {
  captureInboxPersistedStateSchema,
  type CaptureItem,
  type CaptureTag,
} from "./capture-inbox-schema"
import { z } from "zod"
import { StoreApi } from "zustand/vanilla"

const CAPTURE_INDEX_KEY = "capture-inbox-store"

export const getStorageKey = () => CAPTURE_INDEX_KEY
export interface CaptureInboxState {
  items: CaptureItem[]
}
export interface CaptureInboxActions {
  capture: (text: string) => void
  tag: (id: string, tag: CaptureTag) => void
  archive: (id: string) => void
  delete: (id: string) => void
}

export type CaptureInboxStore = CaptureInboxState & CaptureInboxActions

type PersistedCaptureInboxState = z.infer<
  typeof captureInboxPersistedStateSchema
>

export type CaptureInboxStoreApi = Mutate<
  StoreApi<CaptureInboxStore>,
  [["zustand/persist", PersistedCaptureInboxState]]
>

export interface CreateCaptureInboxStoreOptions {
  initialState?: CaptureInboxState
  version?: number
  /** Explicit storage implementation, primarily for tests and non-lazy use. */
  storage?: StateStorage
  /** Lazily resolve storage at hydration time without importing browser APIs. */
  getStorage?: () => StateStorage | undefined
}

export function createCaptureInboxStore({
  version = 1,
  initialState = { items: [] },
}: CreateCaptureInboxStoreOptions): CaptureInboxStoreApi {
  return createStore<CaptureInboxStore>()(
    persist((set, get) => {
      function setItems(items: CaptureItem[]) {
        try {
          set({ items })
        } catch (error) {
          console.warn("Failed to persist capture inbox state:", error)
        }
      }

      return {
        items: [...(initialState.items ?? [])],
        capture: (text) => {
          const trimmed = text.trim()
          if (!trimmed) return
          const item: CaptureItem = {
            id: crypto.randomUUID(),
            text: trimmed,
            createdAt: new Date().toISOString(),
            status: "unsorted",
          }
          setItems([...get().items, item])
        },
        tag: (id, tag) => {
          setItems(
            get().items.map((item) =>
              item.id === id ? { ...item, status: "archived", tag } : item
            )
          )
        },
        archive: (id) => {
          setItems(
            get().items.map((item) =>
              item.id === id
                ? { ...item, status: "archived", tag: undefined }
                : item
            )
          )
        },
        delete: (id) => {
          setItems(get().items.filter((item) => item.id !== id))
        },
      }
    }, createCaptureInboxPersistOptions({ version }))
  )
}

function createCaptureInboxPersistOptions({ version }: { version: number }) {
  return createPersistOptions<CaptureInboxStore, PersistedCaptureInboxState>({
    name: CAPTURE_INDEX_KEY,
    version,
    getStorage: getLocalStorage,
    migrate: (persistedState: unknown) => {
      const result = captureInboxPersistedStateSchema.safeParse(persistedState)
      if (!result.success) {
        console.warn("Failed to migrate capture inbox state:", result.error)
        return { items: [] }
      }
      return result.data
    },
    partialize: ({ items }: CaptureInboxStore) => ({
      items,
    }),
    merge: (persistedState: unknown, currentState: CaptureInboxStore) => {
      if (persistedState == null) return currentState
      const result = captureInboxPersistedStateSchema.safeParse(persistedState)

      if (!result.success) {
        console.warn("Failed to restore capture inbox state:", result.error)
        return currentState
      }
      return { ...currentState, items: result.data.items }
    },
  })
}

export const useCaptureInboxStore = createCaptureInboxStore({ version: 1 })
