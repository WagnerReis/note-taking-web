"use client";
import { SidebarSettings } from "@/app/(app)/settings/components/SidebarSettings";
import { useState } from "react";
import { ChangeTheme } from "./components/ChangeTheme";
import { ChangeFont } from "./components/ChangeFont";
import { useResponsive } from "@/hooks/use-responsive";

enum Tabs {
  ColorTheme = "Color Theme",
  FontTheme = "Font Theme",
}

const TAB_COMPONENTS = {
  [Tabs.ColorTheme]: <ChangeTheme />,
  [Tabs.FontTheme]: <ChangeFont />,
};

export default function SettingsPage() {
  const { isDesktop } = useResponsive();
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.ColorTheme);

  const ActiveComponent = isDesktop ? TAB_COMPONENTS[selectedTab] : null;

  const handleTabChange = (value: string) => {
    setSelectedTab(value as Tabs);
  };

  return (
    <div className="flex h-screen">
      <SidebarSettings
        selectedTab={selectedTab}
        onSelectedTab={handleTabChange}
      />
      {ActiveComponent}
    </div>
  );
}