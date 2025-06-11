"use client";
import { SidebarItem } from "@/components/navigation/sidebar/SidebarItem";
import { Preset1 } from "@/components/Typography";
import { Divider } from "@/components/ui/divider";
import { Tag } from "@/components/ui/icons/tag";

export default function TagsPage() {
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
  return (
    <div className="px-200 md:px-300 mt-250 md:mt-300">
      <Preset1 className="text-neutral-950 dark:text-white">Tags</Preset1>
      <div className="mt-2 flex flex-col">
        {TAGS_MOCK.map((tag, index) => {
          const isTagSelected = false;
          return (
            <div key={tag}>
            <SidebarItem
              icon={<Tag />}
              label={tag}
              isMobile={false}
              isActive={isTagSelected}
              onActive={() =>console.log(tag)}
              />

            {index !== TAGS_MOCK.length - 1 && <Divider />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
