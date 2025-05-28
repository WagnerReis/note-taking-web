"use client";
import { useCallback, useState } from "react"
import { Sun } from "./ui/icons/sun";
import { Type } from "./ui/icons/type";
import { Padlock } from "./ui/icons/padlock";
import { SidebarItem } from "./navigation/sidebar/SidebarItem";
import { Divider } from "./ui/divider";
import { Logout } from "./ui/icons/logout";
import { useResponsive } from "@/hooks/use-responsive";
import { twMerge } from "tailwind-merge";

export function SidebarSettings() {
  const [selectedTab, setSelectedTab] = useState("Color Theme");
  const { isMobile, isTablet } = useResponsive()

  const sidebarItems = [
    {
      icon: <Sun />,
      label: "Color Theme"
    },
    {
      icon: <Type />,
      label: "Font Theme"
    },
    {
      icon: <Padlock />,
      label: "Change Password"
    }
  ]

  const handleSelectItem = useCallback((label: string) => {
    setSelectedTab(label)
  }, [])

  return (
    <main className={twMerge(
      "h-full space-y-2 p-250 ",
      isMobile || isTablet ? "w-full" : "w-[272px] border-r border-neutral-200 dark:border-neutral-800"
    )}>
      {sidebarItems.map(item =>
        <SidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          isMobile={isMobile || isTablet}
          isActive={selectedTab === item.label}
          onActive={() => handleSelectItem(item.label)}
        />
      )}

      <Divider className="my-2" />

      <SidebarItem
        icon={<Logout />}
        label="Logout"
        isMobile={isMobile || isTablet}
        isActive={selectedTab === "Logout"}
        onActive={() => handleSelectItem("Logout")}
      />
    </main>
  )
}



