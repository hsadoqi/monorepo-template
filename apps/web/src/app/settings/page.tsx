import { PreferencesForm } from "@repo/ui-preferences"

export const metadata = {
  title: "Settings",
  description: "Manage your preferences and customize your experience",
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 flex-1 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-2 mx-auto bg-card p-4 sm:p-6 lg:p-8 rounded-lg shadow w-full max-w-5xl flex-1">
        <PreferencesForm />
      </div>
    </div>
  )
}
