import { AppearanceToggle } from "@/preferences/components/appearance-toggle";
import { PanelTrigger } from "./panel-trigger";
import { ThemeShell } from "./theme-shell";
import { SettingsTrigger } from "./settings-trigger";

export const AppHeaderActions = () => {
  return (
    <div className="flex items-center justify-end gap-2">
      <PanelTrigger />
      <ThemeShell />
      <AppearanceToggle />
      <SettingsTrigger />
    </div>
  )
}
