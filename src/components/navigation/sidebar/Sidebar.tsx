"use client";
import { useResponsive } from "@/hooks/use-responsive";
import { Logo } from "../../ui/icons/logo";
import { Home } from "../../ui/icons/home";
import { Archive } from "../../ui/icons/archive";
import { Divider } from "../../ui/divider";
import { useCallback, useState } from "react";
import { Preset4 } from "../../Typography";
import { Tag } from "@/components/ui/icons/tag";
import { SidebarItem } from "./SidebarItem";
import Link from "next/link";

const TAGS_MOCK = [
  "Cooking",
  "Dev",
  "Fitness",
  "Health",
  "Personal",
  "React",
  "Recipes",
  "Shopping",
  "Travel",
  "Typescript",
];

const navItems = [
  {
    icon: <Home />,
    label: "All Notes",
  },
  {
    icon: <Archive />,
    label: "Archived Notes",
  },
];

export function Sidebar() {
  const [selectedNav, setSelectedNav] = useState("All Notes");
  const [selectedTag, setSelectedTag] = useState("");
  const { isDesktop } = useResponsive();

  const handleNavClick = useCallback((label: string) => {
    setSelectedNav(label);
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  return (
    <>
      {isDesktop && (
        <aside className="min-h-screen w-[272px] border-r border-neutral-200 px-200 transition duration-200 ease-in-out dark:border-neutral-800">
          <header className="mt-300">
            <Link
              href="/"
              className="cursor-custom border-none"
              onClick={() => {
                setSelectedTag("");
                setSelectedNav("All Notes");
              }}
            >
              <Logo
                width={95}
                height={28}
                className="text-neutral-950 dark:text-white"
              />
            </Link>
            <nav className="mt-4 flex flex-col">
              {navItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  isActive={item.label === selectedNav}
                  onActive={() => handleNavClick(item.label)}
                />
              ))}
            </nav>
          </header>
          <Divider className="my-2" />
          <div>
            <Preset4 className="mb- text-neutral-500">Tags</Preset4>

            <div className="mt-2 flex flex-col">
              {TAGS_MOCK.map((tag) => {
                const isTagSelected = selectedTag === tag;
                return (
                  <SidebarItem
                    key={tag}
                    icon={<Tag />}
                    label={tag}
                    isActive={isTagSelected}
                    onActive={() => handleTagClick(tag)}
                  />
                );
              })}
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
