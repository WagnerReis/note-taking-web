"use client";
import { useResponsive } from "@/hooks/use-responsive";
import {  useState } from "react";
import { MenuItem } from "./MenuItem";
import { Home } from "@/components/ui/icons/home";
import { Search } from "@/components/ui/icons/search";
import { Archive } from "@/components/ui/icons/archive";
import { Tag } from "@/components/ui/icons/tag";
import { Setting } from "@/components/ui/icons/setting";


export function MenuBar() {
  const { isMobile, isTablet } = useResponsive();
  const [selected, setSelected] = useState("");

  const listItems = [
    {
      icon: <Home />,
      text: "Home",
    },
    {
      icon: <Search />,
      text: "Search",
    },
    {
      icon: <Archive />,
      text: "Archive",
    },
    {
      icon: <Tag />,
      text: "Tag",
    },
    {
      icon: <Setting />,
      text: "Setting",
    },
  ];

  return (
    <>
      {(isMobile || isTablet) && (
        <main className="shadow-top absolute bottom-0 z-999 h-[56px] w-full border-t border-neutral-200 md:h-[74px] dark:border-neutral-800">
          <ul className="flex h-full w-full items-center justify-center">
            {listItems.map((item) => (
              <MenuItem
                key={item.text}
                icon={item.icon}
                label={item.text}
                isActive={item.text === selected}
                onClick={() => setSelected(item.text)}
                showLabel={isTablet}
                isTablet={isTablet}
              />
            ))}
          </ul>
        </main>
      )}
    </>
  );
}
