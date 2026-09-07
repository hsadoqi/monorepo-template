"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createPersistOptions } from "@repo/services-zustand"

import {
  captureInboxPersistedStateSchema,
  type CaptureItem,
  type CaptureTag,
} from "./capture-inbox-schema"

export interface CaptureInboxState {
  items: CaptureItem[]
  capture: (text: string) => void
  tag: (id: string, tag: CaptureTag) => void
  archive: (id: string) => void
  delete: (id: string) => void
}

interface PersistedCaptureInboxState {
  items: CaptureItem[]
}

function getCaptureInboxStorage() {
  if (typeof window === "undefined") return undefined
  try {
    const probe = "__capture_inbox_storage_test__"
    window.localStorage.setItem(probe, probe)
    window.localStorage.removeItem(probe)
    return window.localStorage
  } catch {
    return undefined
  }
}

export function createCaptureInboxStore(version: number) {
  return create<CaptureInboxState>()(
    persist<CaptureInboxState, [], [], PersistedCaptureInboxState>(
      (set, get) => {
        function setItems(items: CaptureItem[]) {
          try {
            set({ items })
          } catch (error) {
            console.warn("Failed to persist capture inbox state:", error)
          }
        }

        return {
          items: [],
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
      },
      createPersistOptions<CaptureInboxState, PersistedCaptureInboxState>({
        name: "capture-inbox-store",
        version,
        getStorage: getCaptureInboxStorage,
        migrate: (persistedState) => {
          const result =
            captureInboxPersistedStateSchema.safeParse(persistedState)
          if (!result.success) {
            console.warn(
              "Failed to restore capture inbox state:",
              result.error
            )
            return { items: [] }
          }
          return result.data
        },
        partialize: (state) => ({ items: state.items }),
        merge: (persistedState, currentState) => {
          const result =
            captureInboxPersistedStateSchema.safeParse(persistedState)
          if (!result.success) {
            console.warn(
              "Failed to restore capture inbox state:",
              result.error
            )
            return currentState
          }
          return { ...currentState, items: result.data.items }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    )
  )
}

export const useCaptureInboxStore = createCaptureInboxStore(1)
