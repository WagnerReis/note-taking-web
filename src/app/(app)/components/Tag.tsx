import { Preset5 } from "@/components/Typography";

interface TagProps {
  tag: string
}

export function Tag({ tag }: TagProps) {
  return (
    <Preset5
      key={tag}
      className="rounded-4 bg-neutral-200 px-[6px] py-[2px] dark:bg-neutral-700"
    >
      {tag}
    </Preset5>
  )
}