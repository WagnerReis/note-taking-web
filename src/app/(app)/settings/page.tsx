"use client";
import { SidebarSettings } from "@/app/(app)/settings/components/SidebarSettings";
import { useState } from "react";
import { ChangeTheme } from "./components/ChangeTheme";
import { useResponsive } from "@/hooks/use-responsive";

export default function SettingsPage() {
  const { isDesktop } = useResponsive()
  const [selectedTab, setSelectedTab] = useState("Color Theme");

  return (
    <div className="flex h-screen">
      <SidebarSettings selectedTab={selectedTab} onSelectedTab={setSelectedTab} />
      {(selectedTab === "Color Theme" && isDesktop) && <ChangeTheme />}
    </div>
  )
}