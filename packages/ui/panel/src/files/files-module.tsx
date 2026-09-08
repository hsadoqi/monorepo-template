"use client"

import { useState } from "react"
import { Button } from "@repo/ui-components/base/button"
import { useModulesStore } from "@repo/runtime-panel"
import { saveFileBlob, deleteFileBlob } from "./file-storage"

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

export function FilesModule() {
  const fileIds = useModulesStore((state) => state.fileIds)
  const fileEntities = useModulesStore((state) => state.fileEntities)
  const addFileMetadata = useModulesStore((state) => state.addFileMetadata)
  const removeFileMetadata = useModulesStore(
    (state) => state.removeFileMetadata
  )
  const [error, setError] = useState<string | null>(null)

  const handleFiles = async (fileList: FileList | null) => {
    const file = fileList?.[0]
    if (!file) return
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`"${file.name}" exceeds the 5MB limit for local file storage.`)
      return
    }
    setError(null)
    const id = crypto.randomUUID()
    await saveFileBlob(id, file)
    addFileMetadata({ id, name: file.name, size: file.size, addedAt: Date.now() })
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium" htmlFor="panel-file-input">
        Add file
      </label>
      <input
        id="panel-file-input"
        type="file"
        aria-label="Add file"
        onChange={(event) => handleFiles(event.target.files)}
      />
      {error && <p className="text-destructive text-xs">{error}</p>}
      <ul className="flex flex-col gap-2">
        {fileIds.map((id) => {
          const file = fileEntities[id]
          if (!file) return null
          return (
            <li
              key={file.id}
              className="flex items-center justify-between gap-2"
            >
              <span className="truncate text-sm">{file.name}</span>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${file.name}`}
                onClick={async () => {
                  await deleteFileBlob(file.id)
                  removeFileMetadata(file.id)
                }}
              >
                ×
              </Button>
            </li>
          )
        })}
      </ul>
      <p className="text-muted-foreground text-xs">
        Files are stored only in this browser, not synced anywhere.
      </p>
    </div>
  )
}
