"use client"

import { Card, CardContent, CardHeader } from "@repo/ui-components/base/card"
import { FontCombobox } from "./font-combobox"
import { FontSizeControl } from "./font-size-control"

interface FontSectionProps {
  headingFont: string
  bodyFont: string
  scaleAdjustment: number
  onHeadingFontChange: (font: string) => void
  onBodyFontChange: (font: string) => void
  onScaleChange: (scale: number) => void
  onResetHeading: () => void
  onResetBody: () => void
  onResetScale: () => void
}

export function FontSection({
  headingFont,
  bodyFont,
  scaleAdjustment,
  onHeadingFontChange,
  onBodyFontChange,
  onScaleChange,
  onResetHeading,
  onResetBody,
  onResetScale,
}: FontSectionProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Typography</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-muted-foreground">
              Font Families
            </h4>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <FontCombobox
                  label="Heading Font"
                  value={headingFont}
                  onChange={onHeadingFontChange}
                />
              </div>
              <button
                onClick={onResetHeading}
                className="mt-6 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                title="Reset heading font"
              >
                Reset
              </button>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <FontCombobox
                  label="Body Font"
                  value={bodyFont}
                  onChange={onBodyFontChange}
                />
              </div>
              <button
                onClick={onResetBody}
                className="mt-6 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                title="Reset body font"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-muted-foreground">
              Type Scale
            </h4>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <FontSizeControl
                value={scaleAdjustment}
                onChange={onScaleChange}
              />
            </div>
            <button
              onClick={onResetScale}
              className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              title="Reset type scale"
            >
              Reset
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
