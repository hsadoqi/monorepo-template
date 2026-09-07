import { PreferencesForm } from "@repo/ui-preferences"

export const metadata = {
  title: "Settings",
  description: "Manage your preferences and customize your experience",
}

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:p-8">
      <div className="bg-card mx-auto flex w-full max-w-5xl flex-1 flex-col gap-2 rounded-lg p-4 shadow sm:p-6 lg:p-8">
        <PreferencesForm />
      </div>
    </div>
  )
}
