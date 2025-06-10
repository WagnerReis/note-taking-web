"use client";
import { Archive } from "@/components/ui/icons/archive";
import { Home } from "@/components/ui/icons/home";
import { Search } from "@/components/ui/icons/search";
import { Setting } from "@/components/ui/icons/setting";
import { Tag } from "@/components/ui/icons/tag";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useResponsive } from "@/hooks/use-responsive";
import { ReactElement, useState } from "react";
import { MenuItem } from "./MenuItem";

interface MenuBarItemProps {
  icon: ReactElement<any, any>;
  label: string;
  redirect: string;
}

export function MenuBar() {
  const { isMobile, isTablet } = useResponsive();
  const [selected, setSelected] = useState("");
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  const listItems: MenuBarItemProps[] = [
    {
      icon: <Home />,
      label: "Home",
      redirect: "/",
    },
    {
      icon: <Search />,
      label: "Search",
      redirect: "/",
    },
    {
      icon: <Archive />,
      label: "Archive",
      redirect: "/",
    },
    {
      icon: <Tag />,
      label: "Tag",
      redirect: "/tags",
    },
    {
      icon: <Setting />,
      label: "Setting",
      redirect: "/settings",
    },
  ];

  return (
    <>
      {(isMobile || isTablet) && (
        <main className="shadow-top absolute bottom-0 z-999999 h-[56px] w-full border-t border-neutral-200 md:h-[74px] dark:border-neutral-800">
          <ul className="flex h-full w-full items-center justify-center">
            {listItems.map((item) => (
              <MenuItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                isActive={item.label === selected}
                onClick={() => setSelected(item.label)}
                showLabel={isTablet}
                isTablet={isTablet}
                redirectPath={item.redirect}
              />
            ))}
          </ul>
        </main>
      )}
    </>
  );
}
