// @vitest-environment node
import "fake-indexeddb/auto"
import { describe, expect, it } from "vitest"
import { saveFileBlob, getFileBlob, deleteFileBlob } from "./file-storage"

describe("file-storage", () => {
  it("saves and retrieves a blob by id", async () => {
    const blob = new Blob(["hello"], { type: "text/plain" })
    await saveFileBlob("file-1", blob)
    const retrieved = await getFileBlob("file-1")
    expect(retrieved).toBeDefined()
    const buffer = await new Response(retrieved).arrayBuffer()
    expect(new TextDecoder().decode(buffer)).toBe("hello")
  })

  it("returns undefined for an unknown id", async () => {
    const retrieved = await getFileBlob("does-not-exist")
    expect(retrieved).toBeUndefined()
  })

  it("deletes a blob", async () => {
    await saveFileBlob("file-2", new Blob(["bye"]))
    await deleteFileBlob("file-2")
    expect(await getFileBlob("file-2")).toBeUndefined()
  })
})
