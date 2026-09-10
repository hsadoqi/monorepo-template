import type { FileMetadata } from "@repo/domain-panel/files"

export interface FilesSlice {
  fileEntities: Record<string, FileMetadata>
  fileIds: string[]
  addFileMetadata: (meta: FileMetadata) => void
  removeFileMetadata: (id: string) => void
}

type SetSlice = (
  partial: Partial<FilesSlice> | ((state: FilesSlice) => Partial<FilesSlice>)
) => void

export function createFilesSlice(set: SetSlice): FilesSlice {
  return {
    fileEntities: {},
    fileIds: [],

    addFileMetadata: (meta) =>
      set((state) => ({
        fileEntities: { ...state.fileEntities, [meta.id]: meta },
        fileIds: [...state.fileIds, meta.id],
      })),
    removeFileMetadata: (id) =>
      set((state) => {
        const { [id]: _removed, ...rest } = state.fileEntities
        return {
          fileEntities: rest,
          fileIds: state.fileIds.filter((existing) => existing !== id),
        }
      }),
  }
}
