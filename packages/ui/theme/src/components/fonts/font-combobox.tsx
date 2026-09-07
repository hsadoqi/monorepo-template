"use client"

import { Button } from "@repo/ui-components/base/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui-components/base/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui-components/base/popover"
import { Check, ChevronDown } from "lucide-react"
import React from "react"
import { GOOGLE_FONTS, loadGoogleFont } from "@repo/runtime-theme/fonts"
import { cn } from "@repo/ui-components/lib/utils"

interface FontComboboxProps {
  label: string
  value: string
  onChange: (val: string) => void
}

export function FontCombobox({ label, value, onChange }: FontComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const labelId = React.useId()

  const filteredFonts = React.useMemo(() => {
    const query = search.toLowerCase()
    return GOOGLE_FONTS.filter((font) => font.toLowerCase().includes(query))
  }, [search])

  React.useEffect(() => {
    if (value && value !== "system-ui") {
      loadGoogleFont(value)
    }
  }, [value])

  return (
    <div className="space-y-1">
      <label id={labelId} className="block text-sm font-medium">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              className="w-full justify-between bg-transparent"
              role="combobox"
              aria-expanded={open}
              aria-labelledby={labelId}
            >
              <span
                style={{ fontFamily: `'${value}', sans-serif` }}
                className="truncate"
              >
                {value}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          }
        />
        <PopoverContent className="w-75 p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search fonts..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>No fonts found.</CommandEmpty>
              <CommandGroup>
                {filteredFonts.map((font) => (
                  <CommandItem
                    key={font}
                    onSelect={() => {
                      if (font !== value) {
                        loadGoogleFont(font)
                        onChange(font)
                      }
                      setOpen(false)
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        font === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span style={{ fontFamily: `'${font}', sans-serif` }}>
                      {font}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
