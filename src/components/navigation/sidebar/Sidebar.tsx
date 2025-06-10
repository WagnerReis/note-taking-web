"use client";
import { Tag } from "@/components/ui/icons/tag";
import { useResponsive } from "@/hooks/use-responsive";
import { useNotesStore } from "@/store/notes/useNotesStore";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Preset4 } from "../../Typography";
import { Divider } from "../../ui/divider";
import { Archive } from "../../ui/icons/archive";
import { Home } from "../../ui/icons/home";
import { Logo } from "../../ui/icons/logo";
import { SidebarItem } from "./SidebarItem";

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
    status: "active",
  },
  {
    icon: <Archive />,
    label: "Archived Notes",
    status: "archived",
  },
];

export function Sidebar() {
  const [selectedNav, setSelectedNav] = useState("All Notes");
  const [selectedTag, setSelectedTag] = useState("");
  const { isDesktop } = useResponsive();
  const { fetchNotes } = useNotesStore();

  const handleNavClick = useCallback((label: string, status: "active" | "archived") => {
    setSelectedNav(label);
    fetchNotes(status);
  }, [fetchNotes]);

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
                  isMobile={false}
                  isActive={item.label === selectedNav}
                  onActive={() => handleNavClick(item.label, item.status as "active" | "archived")}
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
                    isMobile={false}
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
