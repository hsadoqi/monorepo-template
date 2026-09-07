"use client"

import { useEffect, useRef } from "react"

import { applyScopeThemeToElement } from "@repo/adapters-theme-browser"
import { ThemeScopeProvider, useThemeScope } from "@repo/runtime-theme"
import { ScopedThemeToggle } from "@repo/ui-theme/components"
import { useResolvedAppearance } from "../hooks/use-resolved-appearance"

const demoTheme = { enableDarkMode: true } as const

function ScopeDemoContent() {
  const scopeRef = useRef<HTMLDivElement>(null)
  const { isDarkMode, overrides, enableDarkMode, toggleEnableDarkMode } =
    useThemeScope()
  useEffect(() => {
    if (!scopeRef.current) return
    applyScopeThemeToElement(scopeRef.current, {
      isDarkMode: enableDarkMode && isDarkMode,
      primaryColor: overrides.primary,
    })
  }, [enableDarkMode, isDarkMode, overrides.primary])
  return (
    <div
      ref={scopeRef}
      className="border-primary bg-background text-foreground rounded-lg border-2 border-dashed p-6"
      suppressHydrationWarning
    >
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-base font-semibold">Scoped Theme Demo</h3>
          <p className="text-muted-foreground text-sm">
            Customize this section independently
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => toggleEnableDarkMode()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-3 py-2 text-sm font-medium transition-colors"
          >
            {enableDarkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
          </button>
        </div>

        <div className="text-muted-foreground text-xs">
          <div>Dark mode: {isDarkMode ? "ON" : "OFF"}</div>
          {overrides?.primary && <div>Primary color: {overrides.primary}</div>}
        </div>
      </div>
      <ScopedThemeToggle />
    </div>
  )
}
// function ScopeDemoContent() {
//   const scopeRef = useRef<HTMLDivElement>(null)
//   const {
//     isDarkMode,
//     overrides,
//     setPrimaryColor,
//     enableDarkMode,
//     toggleEnableDarkMode,
//   } = useThemeScope()

//   useEffect(() => {
//     if (!scopeRef.current) return

//     applyScopeThemeToElement(scopeRef.current, {
//       isDarkMode: enableDarkMode && isDarkMode,
//       primaryColor: overrides.primary,
//     })
//   }, [enableDarkMode, isDarkMode, overrides.primary])

//   return (
//     <div
//       ref={scopeRef}
//       className="bg-card text-card-foreground border-border w-full min-w-0 overflow-hidden rounded-xl border"
//       suppressHydrationWarning
//     >
//       <div className="border-border flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6">
//         <div className="min-w-0 space-y-1">
//           <h2 className="font-heading text-base font-semibold">Preview area</h2>
//           <p className="text-muted-foreground text-sm leading-5">
//             Changes below stay inside this surface.
//           </p>
//         </div>
//         <span className="bg-muted text-muted-foreground hidden rounded-full px-2.5 py-1 text-xs font-medium sm:inline-flex">
//           Local scope
//         </span>
//       </div>

//       <div className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
//         <section aria-labelledby="scope-color-heading" className="space-y-3">
//           <div className="flex items-center gap-2">
//             <Palette
//               className="text-muted-foreground size-4"
//               aria-hidden="true"
//             />
//             <h3 id="scope-color-heading" className="text-sm font-medium">
//               Accent color
//             </h3>
//           </div>

//           <div
//             className="flex flex-wrap gap-2"
//             role="group"
//             aria-label="Accent color"
//           >
//             {colorOptions.map(({ value, label }) => (
//               <button
//                 key={value}
//                 type="button"
//                 onClick={() => setPrimaryColor(value)}
//                 className="ring-offset-card focus-visible:ring-ring size-8 rounded-md border border-black/10 ring-offset-2 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none"
//                 style={{ backgroundColor: value }}
//                 aria-label={`Use ${label}`}
//                 title={label}
//               />
//             ))}
//           </div>
//         </section>

//         <section
//           aria-labelledby="scope-appearance-heading"
//           className="space-y-3"
//         >
//           <div className="flex items-center gap-2">
//             {isDarkMode ? (
//               <Moon
//                 className="text-muted-foreground size-4"
//                 aria-hidden="true"
//               />
//             ) : (
//               <Sun
//                 className="text-muted-foreground size-4"
//                 aria-hidden="true"
//               />
//             )}
//             <div>
//               <h3 id="scope-appearance-heading" className="text-sm font-medium">
//                 Appearance
//               </h3>
//               <p className="text-muted-foreground text-xs leading-5">
//                 {enableDarkMode
//                   ? `This preview is using ${isDarkMode ? "dark" : "light"} mode.`
//                   : "Dark mode is unavailable for this preview."}
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col items-start gap-2 sm:flex-row">
//             <ScopedThemeToggle showAlert={false}>
//               {isDarkMode ? "Use light mode" : "Use dark mode"}
//             </ScopedThemeToggle>
//             <Button
//               type="button"
//               variant="ghost"
//               size="lg"
//               onClick={() => toggleEnableDarkMode()}
//             >
//               {enableDarkMode ? "Disable dark mode" : "Enable dark mode"}
//             </Button>
//           </div>
//         </section>

//         <div className="border-border text-muted-foreground flex flex-col gap-1 border-t pt-4 text-xs tabular-nums sm:flex-row sm:gap-x-5">
//           <span>Mode: {isDarkMode ? "Dark" : "Light"}</span>
//           <span>Accent: {overrides.primary ?? "Theme default"}</span>
//         </div>
//       </div>
//     </div>
//   )
// }

export function ScopeDemo() {
  const resolvedAppearance = useResolvedAppearance()

  return (
    <ThemeScopeProvider
      scopeId="demo"
      overrides={{
        ...demoTheme,
        enableDarkMode: demoTheme.enableDarkMode,
        isDarkMode: demoTheme.enableDarkMode && resolvedAppearance === "dark",
      }}
    >
      <ScopeDemoContent />
    </ThemeScopeProvider>
  )
}
