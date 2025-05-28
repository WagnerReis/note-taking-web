"use client";
import { useCallback, useState } from "react"
import { Sun } from "./ui/icons/sun";
import { Type } from "./ui/icons/type";
import { Padlock } from "./ui/icons/padlock";
import { SidebarItem } from "./navigation/sidebar/SidebarItem";
import { Divider } from "./ui/divider";
import { Logout } from "./ui/icons/logout";

export function SidebarSettings() {
  const [selectedTab, setSelectedTab] = useState("Color Theme");

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
    <main className="h-full w-[272px] space-y-2 p-250 border-r border-neutral-200 dark:border-neutral-800">
      {sidebarItems.map(item =>
        <SidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          isActive={selectedTab === item.label}
          onActive={() => handleSelectItem(item.label)}
        />
      )}

      <Divider className="my-2" />

      <SidebarItem
        icon={<Logout />}
        label="Logout"
        isActive={selectedTab === "Logout"}
        onActive={() => handleSelectItem("Logout")}
      />
    </main>
  )
}



