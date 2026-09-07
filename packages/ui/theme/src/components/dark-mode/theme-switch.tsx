"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { Switch } from "@repo/ui-components/base/switch"

type ThemeSwitchProps = {
  checked: boolean
  disabled?: boolean
  id?: string
  onCheckedChange: (checked: boolean) => void
}

const ThemeSwitch = ({
  checked,
  disabled,
  id,
  onCheckedChange,
}: ThemeSwitchProps) => {
  return (
    <div className="inline-flex items-center gap-2">
      <MoonIcon className="size-4 text-muted-foreground" />
      <Switch
        disabled={disabled}
        checked={checked}
        className="h-5 w-9 rounded-sm [&_span]:size-4 [&_span]:rounded"
        id={id}
        onCheckedChange={onCheckedChange}
      />
      <SunIcon className="size-4" />
    </div>
  )
}

export default ThemeSwitch
