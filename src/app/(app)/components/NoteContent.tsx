"use client";
import { Preset1, Preset5 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { CircleClock } from "@/components/ui/icons/circle-clock";
import { Tag } from "@/components/ui/icons/tag";
import { useResponsive } from "@/hooks/use-responsive";
import { useNotesStore } from "@/store/notes/useNotesStore";
import { formatDate } from "@/utils/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { MobilePageHeaderControl } from "./MobilePageHeaderControl";

const noteFormSchema = z.object({
  title: z.string(),
  tags: z.string(),
  content: z.string(),
});

type NoteFormData = z.infer<typeof noteFormSchema>;

export function NoteContent() {
  const { selectedNote: note, setSelectedNote, updateNote } = useNotesStore();
  const { isDesktop, isMobile, isTablet } = useResponsive();
  const { register, handleSubmit } = useForm<NoteFormData>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: note?.title,
      tags: note?.tags.join(", "),
      content: note?.content,
    },
  });

  if (!note) {
    return null;
  }

  const isSmallScreen = isMobile || isTablet;

  async function onSubmit(data: NoteFormData) {
    const tagsArray = data.tags
                        .split(",")
                        .map(tag => tag.trim())
                        .filter(Boolean);

    await updateNote({
      id: note?.id,
      ...data,
      tags: tagsArray,
    });
  }

  function getInputStyle(height: number) {
    return twMerge(
      "w-full",
      `rounded-8 w-full h-${height} cursor-custom`,
      "hover:transition-colors duration-300",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-offset-2",
      "focus:ring-offset-white",
      "dark:focus:ring-offset-neutral-950",
      "focus:ring-neutral-300",
      "dark:focus:ring-neutral-500",
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col space-y-3 p-4 pb-[56px] md:p-8 md:pb-[74px] lg:p-6"
    >
      {isSmallScreen && <MobilePageHeaderControl />}

      <Preset1>
        <input
          type="text"
          defaultValue={note.title}
          {...register("title")}
          className={getInputStyle(9)}
        />
      </Preset1>

      <div>
        <div className="flex h-[26px] items-center">
          <Tag className="h-4 w-4" />
          <Preset5 className="ml-1.5 inline w-[115px] text-neutral-700 dark:text-neutral-300">
            Tags
          </Preset5>
          <Preset5 className="text-neutral-950 dark:text-white">
            <input
              type="text"
              defaultValue={note.tags.join(", ")}
              {...register("tags")}
              className={getInputStyle(4)}
            />
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
        id="content"
        defaultValue={note.content}
        className="w-full flex-1 resize-none bg-transparent outline-none"
        {...register("content")}
      />

      {isDesktop && (
        <div className="mt-4 flex flex-col gap-4">
          <Divider />
          <div className="w flex gap-4">
            <Button
              intent="primary"
              text="Save note"
              className="w-[99px]"
              type="submit"
            />
            <Button
              intent="tertiary"
              text="Cancel"
              className="w-[78px]"
              type="button"
              onClick={() => setSelectedNote(null)}
            />
          </div>
        </div>
      )}
    </form>
  );
}
