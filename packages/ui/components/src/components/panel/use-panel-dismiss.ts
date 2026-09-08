import { useEffect } from "react"

export interface UsePanelDismissOptions {
  enabled: boolean
  onDismiss: () => void
  panelRef: React.RefObject<HTMLElement | null>
}

export function usePanelDismiss({ enabled, onDismiss, panelRef }: UsePanelDismissOptions) {
  useEffect(() => {
    if (!enabled) return

    const handlePointerDown = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onDismiss()
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDismiss()
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [enabled, onDismiss, panelRef])
}
