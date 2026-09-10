"use client"

import { useRef, useState } from "react"
import { Upload } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@repo/ui-components/base/button"
import { IconButton } from "@repo/ui-components"
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
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    addFileMetadata({
      id,
      name: file.name,
      size: file.size,
      addedAt: Date.now(),
    })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={fileInputRef}
        id="panel-file-input"
        type="file"
        aria-label="Add file"
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
      <Button
        variant="outline"
        size="sm"
        className="w-fit gap-2"
        onClick={() => fileInputRef.current?.click()}
      >
        <HugeiconsIcon icon={Upload} className="size-4" />
        Add file
      </Button>
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
              <IconButton
                variant="ghost"
                size="icon-sm"
                label={`Remove ${file.name}`}
                onClick={async () => {
                  await deleteFileBlob(file.id)
                  removeFileMetadata(file.id)
                }}
              >
                ×
              </IconButton>
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
