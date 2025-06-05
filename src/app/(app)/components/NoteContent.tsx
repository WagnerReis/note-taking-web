import { Preset1, Preset5 } from "@/components/Typography";
import { NoteProps } from "./Note";
import { Divider } from "@/components/ui/divider";
import { Tag } from "@/components/ui/icons/tag";
import { CircleClock } from "@/components/ui/icons/circle-clock";
import { formatDate } from "@/utils/formatDate";


export function NoteContent() {
  const note: NoteProps["note"] = {
    id: "683604b77d6665d2b5ce357d",
    title: "tal coisa",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis at accusamus itaque nisi molestias qui iusto numquam asperiores. Amet magni mollitia id consectetur blanditiis tempora laborum similique quo officiis ut.",
    status: "archived",
    tags: ["React", "Node"],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <div className="w-full p-4 space-y-3">
      <Preset1>{note.title}</Preset1>

      <div>
        <div className="flex items-center h-[26px]">
          <Tag className="w-4 h-4" />
          <Preset5 className="w-[115px] ml-1.5 inline text-neutral-700 dark:text-neutral-300">Tags</Preset5>
          <Preset5 className="text-neutral-950 dark:text-white">
            {note.tags.join(", ")}
          </Preset5>
        </div>

        <div className="flex items-center h-[26px]">
          <CircleClock className="w-4 h-4" />
          <Preset5 className="w-[115px] ml-1.5 inline text-neutral-700 dark:text-neutral-300">Last edited</Preset5>
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
        className="w-full h-full bg-transparent outline-none resize-none"
      />
    </div>
  )
}