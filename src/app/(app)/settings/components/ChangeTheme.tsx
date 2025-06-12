"use client";
import { DarkMode } from "@/components/ui/icons/dark-mode";
import { LightMode } from "@/components/ui/icons/light-mode";
import { Sun } from "@/components/ui/icons/sun";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useToaster } from "@/hooks/useToaster";
import { useTheme } from "next-themes";
import { OptionProps, PreferenceSelector } from "./PreferenceSelector";

type ThemeType = "light" | "dark" | "system";

export function ChangeTheme() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();
  const { success } = useToaster();

  const options: OptionProps<ThemeType>[] = [
    {
      icon: <Sun />,
      title: "Light Mode",
      value: "light",
      description: "Pick a clean and classic light theme.",
    },
    {
      icon: <DarkMode />,
      title: "Dark Mode",
      value: "dark",
      description: "Select a sleek and modern dark theme.",
    },
    {
      icon: <LightMode />,
      title: "System",
      value: "system",
      description: "Follow your system preference.",
    },
  ];

  if (!isMounted) return null;

  return (
    <PreferenceSelector
      title="Color Theme"
      subtitle="Choose your color theme:"
      options={options}
      selected={theme as ThemeType}
      onApply={(t) => {
        setTheme(t);
        success("Settings updated successfully!");
      }}
    />
  );
}
