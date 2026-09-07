"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {
  Field,
  FieldGroup,
  FieldError,
  FieldLabel,
  FieldDescription,
} from "@repo/ui-components/base/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@repo/ui-components/base/input-group"
// import { compile } from "@repo/domain-theme/compiler"
import { TagsInput } from "./tags-input"
// import { toThemeCompilationInput } from "./theme-form-mapper"
// import { themeFormSchema } from "../..";

export const themeMetadataFormSchema = z.object({
  name: z
    .string()
    .min(1, "Theme name is required")
    .max(64, "Theme name must be at most 64 characters"),
  description: z
    .string()
    .max(256, "Description must be at most 256 characters")
    .optional(),
  tags: z.array(z.object({ id: z.string(), text: z.string() })).optional(),
})

export type ThemeMetadataFormValues = z.infer<typeof themeMetadataFormSchema>
export const ThemeMetadataForm = () => {
  const metadataForm = useForm<z.infer<typeof themeMetadataFormSchema>>({
    resolver: zodResolver(themeMetadataFormSchema),
    defaultValues: {
      name: "My Theme",
      description: "",
      tags: [],
    },
  })

  function onSubmit(data: z.infer<typeof themeMetadataFormSchema>) {
    // const { theme, cssVariables, report } = compile(
    // toThemeCompilationInput(data)
    // )

    // if (!report.success || !theme) {
    //   toast.error("Theme metadata compilation failed", {
    //     description: report.errors.join(", "),
    //     position: "bottom-right",
    //   })
    //   return
    // }

    // if (report.warnings.length > 0) {
    //   toast.warning("Theme metadata compiled with warnings", {
    //     description: report.warnings.join(", "),
    //     position: "bottom-right",
    //   })
    // }

    toast("Data saved:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground text-xs">
          <code>{JSON.stringify({ data }, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
    })
  }

  return (
    <div className="space-y-6 px-2 py-4">
      <form
        id="form-theme-metadata"
        onSubmit={metadataForm.handleSubmit(onSubmit)}
      >
        <FieldGroup className="space-y-4">
          <Controller
            name="name"
            control={metadataForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="theme-name">Name</FieldLabel>
                <InputGroupInput
                  {...field}
                  id="theme-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Untitled"
                  maxLength={64}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={metadataForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="theme-description">Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="theme-description"
                    placeholder="Describe your theme..."
                    rows={3}
                    className="min-h-20 resize-none"
                    maxLength={256}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums text-xs">
                      {field.value?.length || 0}/256
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <Controller
              name="tags"
              control={metadataForm.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="theme-tags">Tags</FieldLabel>
                  <TagsInput
                    field={{
                      ...field,
                      value: field.value || [],
                    }}
                  />
                  <FieldDescription>
                    Comma-separated tags for organization
                  </FieldDescription>
                </Field>
              )}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
