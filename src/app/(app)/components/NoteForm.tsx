"use client";
import { Preset1, Preset5 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { CircleClock } from "@/components/ui/icons/circle-clock";
import { Loading } from "@/components/ui/icons/loading";
import { Tag } from "@/components/ui/icons/tag";
import { useResponsive } from "@/hooks/use-responsive";
import { useToaster } from "@/hooks/useToaster";
import { useNotesStore } from "@/store/notes/useNotesStore";
import { formatDate } from "@/utils/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { MobilePageHeaderControl } from "./MobilePageHeaderControl";

const noteFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  tags: z.string(),
  content: z.string().min(1, "Content is required"),
});

export type NoteFormData = z.infer<typeof noteFormSchema>;

interface NoteFormProps {
  onSubmit: (data: NoteFormData) => Promise<void>;
}

export function NoteForm({ onSubmit }: NoteFormProps) {
  const { selectedNote: note, setSelectedNote, isArchived } = useNotesStore();
  const { success } = useToaster();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: note?.title || "",
      tags: note?.tags.join(", ") || "",
      content: note?.content || "",
    },
  });

  useEffect(() => {
    reset({
      title: note?.title || "",
      tags: note?.tags.join(", ") || "",
      content: note?.content || "",
    });
  }, [note, reset]);

  const { isSmallScreen } = useResponsive();

  function getInputStyle(height: number) {
    return twMerge(
      `w-full rounded-4 h-${height} cursor-custom`,
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
          placeholder="Enter a title…"
          {...register("title")}
          className={twMerge(
            getInputStyle(9),
            "placeholder:text-neutral-950 dark:placeholder:text-white",
          )}
        />
      </Preset1>

      <div className="">
        <div className="flex h-[26px] items-center">
          <Tag className="h-4 w-4" />
          <Preset5 className="ml-1.5 inline min-w-[115px] text-neutral-700 dark:text-neutral-300">
            Tags
          </Preset5>
          <Preset5 className="w-full text-neutral-950 dark:text-white">
            <input
              type="text"
              placeholder="Add tags separated by commas (e.g. Work, Planning)"
              {...register("tags")}
              className={twMerge(
                getInputStyle(5),
                "rounded-4 text-neutral-400",
              )}
            />
          </Preset5>
        </div>

        {isArchived && (
          <div className="flex h-[26px] items-center">
            <Loading className="h-4 w-4" />
            <Preset5 className="ml-1.5 inline w-[115px] text-neutral-700 dark:text-neutral-300">
              Status
            </Preset5>
            <Preset5 className="text-neutral-950 dark:text-white">
              Archived
            </Preset5>
          </div>
        )}

        <div className="flex h-[26px] items-center">
          <CircleClock className="h-4 w-4" />
          <Preset5 className="ml-1.5 inline w-[115px] text-neutral-700 dark:text-neutral-300">
            Last edited
          </Preset5>
          <Preset5
            className={twMerge(
              "text-neutral-700 dark:text-neutral-300",
              !note?.updatedAt && "text-neutral-400",
            )}
          >
            {note?.updatedAt ? formatDate(note?.updatedAt) : "Not yet saved"}
          </Preset5>
        </div>
      </div>

      <Divider />
      <Preset5 className="h-full">
        <textarea
          id="content"
          className="rounded-4 h-full w-full flex-1 resize-none bg-transparent outline-none placeholder:text-neutral-700 dark:placeholder:text-neutral-100"
          placeholder="Start typing your note here…"
          {...register("content")}
        />
      </Preset5>

      {errors && (
        <Preset5 className="flex gap-1 text-red-400">
          {(Object.keys(errors) as Array<keyof typeof errors>).map(
            (key, index) => (
              <div key={key}>
                {errors[key]?.message}
                {index !== Object.keys(errors).length - 1 ? "," : "."}
              </div>
            ),
          )}
        </Preset5>
      )}

      {!isSmallScreen && (
        <div className="mt-4 flex flex-col gap-4">
          <Divider />
          <div className="w flex gap-4">
            <Button
              intent="primary"
              text="Save note"
              className="w-[99px]"
              type="submit"
              onClick={() => {
                success("Note saved successfully!");
              }}
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
