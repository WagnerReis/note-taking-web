"use client";
import { SidebarSettings } from "@/app/(app)/settings/components/SidebarSettings";
import { Loading } from "@/components/Loading";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useResponsive } from "@/hooks/use-responsive";
import { useState } from "react";
import { ChangeFont } from "./components/ChangeFont";
import { ChangePassword } from "./components/ChangePassword";
import { ChangeTheme } from "./components/ChangeTheme";

enum Tabs {
  ColorTheme = "Color Theme",
  FontTheme = "Font Theme",
  ChangePassword = "Change Password",
}

const TAB_COMPONENTS = {
  [Tabs.ColorTheme]: <ChangeTheme />,
  [Tabs.FontTheme]: <ChangeFont />,
  [Tabs.ChangePassword]: <ChangePassword />,
};

export default function SettingsPage() {
  const { isDesktop } = useResponsive();
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.ColorTheme);
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <Loading />;
  }

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
