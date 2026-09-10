"use client"

import { useEffect, useState } from "react"
import { Button } from "@repo/ui-components/base/button"
import { useModulesStore } from "@repo/runtime-panel"

const DEFAULT_DURATION_MS = 25 * 60 * 1000

function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

export function FocusModule() {
  const endTimestamp = useModulesStore((state) => state.endTimestamp)
  const isRunning = useModulesStore((state) => state.isRunning)
  const startFocus = useModulesStore((state) => state.startFocus)
  const pauseFocus = useModulesStore((state) => state.pauseFocus)
  const resetFocus = useModulesStore((state) => state.resetFocus)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  const remainingMs = endTimestamp
    ? Math.max(0, endTimestamp - now)
    : DEFAULT_DURATION_MS

  const handleStart = () => {
    const startedAt = Date.now()
    setNow(startedAt)
    startFocus(remainingMs || DEFAULT_DURATION_MS)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-2xl font-semibold tabular-nums">
        {formatRemaining(remainingMs)}
      </span>
      <div className="flex gap-2">
        {!isRunning ? (
          <Button size="sm" onClick={handleStart}>
            Start
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={pauseFocus}>
            Pause
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={resetFocus}>
          Reset
        </Button>
      </div>
    </div>
  )
}
