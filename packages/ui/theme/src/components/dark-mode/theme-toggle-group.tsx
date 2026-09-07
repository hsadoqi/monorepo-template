import {
  ToggleGroup,
  ToggleGroupItem,
} from "@repo/ui-components/base/toggle-group"

export type ThemeToggleGroupProps = {
  value: "light" | "dark" | "system"
  onChange: (value: "light" | "dark" | "system") => void
}

import { Monitor, Moon, Sun } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export const ThemeToggleGroup = ({
  value,
  onChange,
}: ThemeToggleGroupProps) => {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup
        value={[value]}
        onValueChange={([value]) =>
          onChange(value as "light" | "dark" | "system")
        }
        variant="outline"
      >
        <ToggleGroupItem value="light" aria-label="Light theme">
          <HugeiconsIcon icon={Sun} />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark theme">
          <HugeiconsIcon icon={Moon} />
        </ToggleGroupItem>
        <ToggleGroupItem value="system" aria-label="System theme">
          System
          <HugeiconsIcon icon={Monitor} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
