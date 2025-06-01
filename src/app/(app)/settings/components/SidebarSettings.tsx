"use client";
import { useCallback } from "react";
import { Sun } from "../../../../components/ui/icons/sun";
import { Type } from "../../../../components/ui/icons/type";
import { Padlock } from "../../../../components/ui/icons/padlock";
import { SidebarItem } from "../../../../components/navigation/sidebar/SidebarItem";
import { Divider } from "../../../../components/ui/divider";
import { Logout } from "../../../../components/ui/icons/logout";
import { useResponsive } from "@/hooks/use-responsive";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

interface SidebarSettingsProps {
  selectedTab: string;
  onSelectedTab: (value: string) => void;
}

export function SidebarSettings({
  selectedTab,
  onSelectedTab,
}: SidebarSettingsProps) {
  const { isMobile, isTablet } = useResponsive();
  const router = useRouter();

  const sidebarItems = [
    {
      icon: <Sun />,
      label: "Color Theme",
      redirect: "/settings/change-theme",
    },
    {
      icon: <Type />,
      label: "Font Theme",
      redirect: "/settings/change-font",
    },
    {
      icon: <Padlock />,
      label: "Change Password",
      redirect: "/settings/change-password",
    },
  ];

  const handleSelectItem = useCallback((label: string) => {
    onSelectedTab(label);
  }, []);

  async function handleLogout() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
      method: "POST",
    })

    console.log("aaaaaaaaaa", response)

    router.push("/login");
  }

  return (
    <main
      className={twMerge(
        "h-full space-y-2 p-250",
        isMobile || isTablet
          ? "w-full"
          : "w-[272px] border-r border-neutral-200 dark:border-neutral-800",
      )}
    >
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          isMobile={isMobile || isTablet}
          redirectPath={item.redirect}
          isActive={selectedTab === item.label}
          onActive={() => handleSelectItem(item.label)}
        />
      ))}

      <Divider className="my-2" />

      <button className="w-full" onClick={handleLogout}>
        <div className={twMerge(
          "px-150 py-[10px] flex items-center gap-2 rounded-8 cursor-custom text-neutral-700 dark:text-neutral-200",
          "hover:text-neutral-950 hover:dark:text-white"
        )}>
          <Logout />
          <p className="text-sm">Logout</p>
        </div>
      </button>
    </main>
  );
}
