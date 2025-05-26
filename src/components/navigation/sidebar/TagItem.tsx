import { Preset4 } from "@/components/Typography";
import { ChevronRightMD } from "@/components/ui/icons/chevron-right-md";
import { Tag } from "@/components/ui/icons/tag";
import { twMerge } from "tailwind-merge";

interface TagItemProps {
  tag: string;
  isTagSelected: boolean;
  onTagSelected: () => void;
}

export function TagItem({ tag, isTagSelected, onTagSelected }: TagItemProps) {
  return (
    <button key={tag}
      onClick={onTagSelected}
      className={twMerge("py-[10px] px-150 flex gap-2 text-neutral-700 dark:text-neutral-200 items-center cursor-custom rounded-8",
        isTagSelected && "bg-neutral-100 dark:bg-neutral-800"
      )}>
      <Tag className={isTagSelected ? "text-blue-500 dark:text-blue-500" : ""} />
      <div className={twMerge("text-neutral-700 dark:text-neutral-200",
        isTagSelected && "text-neutral-950 dark:text-white"
      )}><Preset4>{tag}</Preset4></div>
      {isTagSelected && <ChevronRightMD className="ml-auto" />}
    </button >
  )
}