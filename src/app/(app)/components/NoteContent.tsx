"use client";
import { Preset1, Preset5 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { CircleClock } from "@/components/ui/icons/circle-clock";
import { Tag } from "@/components/ui/icons/tag";
import { useResponsive } from "@/hooks/use-responsive";
import { useNotesStore } from "@/store/notes/useNotesStore";
import { formatDate } from "@/utils/formatDate";
import { MobilePageHeaderControl } from "./MobilePageHeaderControl";

export function NoteContent() {
  const { selectedNote: note, setSelectedNote } = useNotesStore();
  const { isDesktop, isMobile, isTablet } = useResponsive();

  if (!note) {
    return null;
  }

  const isSmallScreen = isMobile || isTablet;

  return (
    <div
      className="flex h-full w-full flex-col space-y-3 p-4 md:p-8 lg:p-6"
    >
      {isSmallScreen && <MobilePageHeaderControl />}

      <Preset1>{note.title}</Preset1>

      <div>
        <div className="flex h-[26px] items-center">
          <Tag className="h-4 w-4" />
          <Preset5 className="ml-1.5 inline w-[115px] text-neutral-700 dark:text-neutral-300">
            Tags
          </Preset5>
          <Preset5 className="text-neutral-950 dark:text-white">
            {note.tags.join(", ")}
          </Preset5>
        </div>

        <div className="flex h-[26px] items-center">
          <CircleClock className="h-4 w-4" />
          <Preset5 className="ml-1.5 inline w-[115px] text-neutral-700 dark:text-neutral-300">
            Last edited
          </Preset5>
          <Preset5 className="text-neutral-700 dark:text-neutral-300">
            {formatDate(note.updatedAt)}
          </Preset5>
        </div>
      </div>

      <Divider />
      <textarea
        name="content"
        id="content"
        defaultValue={note.content}
        className="w-full flex-1 resize-none bg-transparent outline-none"
      />

      {isDesktop && (
        <div className="mt-4 flex flex-col gap-4">
          <Divider />
          <div className="w flex gap-4">
            <Button intent="primary" text="Save note" className="w-[99px]" />
            <Button
              intent="tertiary"
              text="Cancel"
              className="w-[78px]"
              onClick={() => setSelectedNote(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
