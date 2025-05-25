"use client";
import { useResponsive } from "@/hooks/use-responsive";
import { Home } from "../../ui/icons/home";
import { Search } from "../../ui/icons/search";
import { Archive } from "../../ui/icons/archive";
import { Tag } from "../../ui/icons/tag";
import { Setting } from "../../ui/icons/setting";
import {  useState } from "react";
import { MenuItem } from "./MenuItem";


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
