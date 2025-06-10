import { Preset4 } from "@/components/Typography";

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
  );
}
