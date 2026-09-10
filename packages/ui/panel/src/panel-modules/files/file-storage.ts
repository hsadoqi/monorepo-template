const DB_NAME = "synapcity-panel-files"
const STORE_NAME = "files"
const DB_VERSION = 1

interface StoredFile {
  buffer: ArrayBuffer
  type: string
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function saveFileBlob(id: string, blob: Blob): Promise<void> {
  const buffer = await new Response(blob).arrayBuffer()
  const stored: StoredFile = { buffer, type: blob.type }
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    tx.objectStore(STORE_NAME).put(stored, id)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getFileBlob(id: string): Promise<Blob | undefined> {
  const db = await openDb()
  const stored = await new Promise<StoredFile | undefined>(
    (resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly")
      const request = tx.objectStore(STORE_NAME).get(id)
      request.onsuccess = () =>
        resolve(request.result as StoredFile | undefined)
      request.onerror = () => reject(request.error)
    }
  )
  if (!stored) return undefined
  return new Blob([stored.buffer], { type: stored.type })
}

export async function deleteFileBlob(id: string): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    tx.objectStore(STORE_NAME).delete(id)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
