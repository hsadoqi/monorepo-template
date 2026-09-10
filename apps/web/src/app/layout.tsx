import { readPreferencesCookie } from "@repo/adapters-next"
import { generateAppearanceBootstrapCode } from "@repo/adapters-theme-browser/bootstrap"
import { DEFAULT_APPEARANCE_PREFERENCE } from "@repo/domain-preferences"
import { cn } from "@repo/ui-components/lib/utils"
import { Metadata, Viewport } from "next"
import { Geist_Mono, IBM_Plex_Sans, Raleway } from "next/font/google"
import Script from "next/script"
import React, { type ReactNode } from "react"
import { ApplicationProviders } from "../providers/application-providers"
import AppShell from "@/components/core/app-shell"
import "./globals.css"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
})
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})
export interface RootLayoutProps {
  children: ReactNode
}
export const metadata: Metadata = {
  title: {
    default: "Synapcity",
    template: "%s | Synapcity",
  },
  description:
    "Synapcity is a modular personal knowledge and workspace platform for documents, notes, projects, dashboards, runbooks, and connected information.",
}
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}
export default async function RootLayout({ children }: RootLayoutProps) {
  const preferences = await readPreferencesCookie()
  const storedPreference = preferences?.appearance
  const storedLanguage = preferences?.language ?? "en"
  const initialAppearance = storedPreference ?? DEFAULT_APPEARANCE_PREFERENCE
  const explicitAppearance =
    initialAppearance === "system" ? undefined : initialAppearance
  // When preference is "system", we suppress hydration warnings because
  // the theme class will be added by bootstrap script (beforeInteractive),
  // which may differ from server render due to browser's system preference.
  const needsHydrationSuppression = initialAppearance === "system"
  return (
    <html
      lang={storedLanguage}
      className={cn(
        "antialiased",
        "font-sans",
        raleway.variable,
        ibmPlexSans.variable,
        geistMono.variable,
        "bg-background text-foreground relative h-svh w-full max-w-full overflow-hidden",
        explicitAppearance
      )}
      data-theme={explicitAppearance}
      style={
        explicitAppearance
          ? {
              colorScheme: explicitAppearance,
            }
          : undefined
      }
      suppressHydrationWarning={needsHydrationSuppression}
    >
      <body className="bg-background text-foreground size-full h-svh max-w-screen overflow-hidden antialiased">
        <Script
          id="appearance-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: generateAppearanceBootstrapCode(initialAppearance),
          }}
        />
        <ApplicationProviders
          initialPreferences={{
            appearance: initialAppearance,
            language: storedLanguage,
          }}
        >
          <AppShell>{children}</AppShell>
        </ApplicationProviders>
      </body>
    </html>
  )
}
