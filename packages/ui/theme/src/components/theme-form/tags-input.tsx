"use client"

import { useState } from "react"
import { Tag, TagInput } from "emblor"

type TagsInputField = {
  name: string
  value: Tag[]
  onChange: (tags: Tag[]) => void
}

export function TagsInput({ field }: { field: TagsInputField }) {
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)

  return (
    <TagInput
      placeholder="Enter a topic"
      tags={field.value}
      setTags={(update) => {
        field.onChange(
          typeof update === "function" ? update(field.value) : update
        )
      }}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
    />
  )
}
