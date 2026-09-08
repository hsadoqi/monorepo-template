import { describe, expect, it } from "vitest"
import { getLocalStorage } from "./get-local-storage"

describe("getLocalStorage", () => {
  it("returns window.localStorage when available", () => {
    expect(getLocalStorage()).toBe(window.localStorage)
  })

  it("returns undefined when localStorage throws", () => {
    const originalSetItem = Storage.prototype.setItem
    Storage.prototype.setItem = () => {
      throw new Error("QuotaExceededError (simulated)")
    }
    try {
      expect(getLocalStorage()).toBeUndefined()
    } finally {
      Storage.prototype.setItem = originalSetItem
    }
  })
})
