"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { parseDate } from "chrono-node"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@repo/ui-components/base/calendar"
import { Field, FieldLabel } from "@repo/ui-components/base/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@repo/ui-components/base/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui-components/base/popover"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function DatePickerNaturalLanguage({
  label,
  onChange,
  value,
}: {
  label: string
  onChange?: (value: string) => void
  onSubmit?: () => void
  value?: string
}) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(value ?? "In 2 days")
  const [date, setDate] = useState<Date | undefined>(undefined)

  const eventRef = useRef<HTMLInputElement | null>(null)

  const outputValue = useMemo(() => {
    const date = parseDate(value ?? "")
    if (!date) {
      return value ?? ""
    }
    return formatDate(date)
  }, [value])

  useEffect(() => {
    if (eventRef.current) {
      eventRef.current.value = outputValue
    }
  }, [outputValue])
  return (
    <Field className="mx-auto max-w-xs">
      {label && (
        <FieldLabel htmlFor={label.toLowerCase().split(" ").join("-")}>
          {label}
        </FieldLabel>
      )}
      <InputGroup>
        <InputGroupInput
          ref={eventRef}
          id="date-optional"
          value={internalValue}
          placeholder="Tomorrow or next week"
          onChange={(e) => {
            const target = e.target.value
            const readableDate = parseDate(target)
            const eventValue = new Date(target)
            eventRef.current!.value = eventValue
              ? formatDate(readableDate!)
              : target
            setInternalValue(target)
            onChange?.(target)
            const date = parseDate(target)
            if (date) {
              setDate(date)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <InputGroupButton
                  id="date-picker"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Select date"
                >
                  <CalendarIcon />
                  <span className="sr-only">Select date</span>
                </InputGroupButton>
              }
            />

            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              sideOffset={8}
            >
              <Calendar
                mode="single"
                required
                selected={date}
                captionLayout="dropdown"
                defaultMonth={date}
                onSelect={(date: Date) => {
                  eventRef.current!.value = formatDate(date)
                  setDate(date)
                  setInternalValue(formatDate(date))
                  onChange?.(formatDate(date))
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
