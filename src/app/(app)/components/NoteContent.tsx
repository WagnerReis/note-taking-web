import { Preset1, Preset5 } from "@/components/Typography";
import { Divider } from "@/components/ui/divider";
import { Tag } from "@/components/ui/icons/tag";
import { CircleClock } from "@/components/ui/icons/circle-clock";
import { formatDate } from "@/utils/formatDate";
import { useNotesStore } from "@/store/notes/useNotesStore";

export function NoteContent() {
  const { selectedNote: note } = useNotesStore();

  if (!note) {
    return null;
  }

  return (
    <div className="h-full w-full space-y-3 overflow-hidden p-4">
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
        className="h-full w-full resize-none bg-transparent outline-none"
      />
    </div>
  );
}
