import { Button } from "@/components/ui/button";
import { Archive } from "@/components/ui/icons/archive";
import { Delete } from "@/components/ui/icons/delete";

export function SidebarRight() {
  const iconClassName = "text-black dark:text-white"

  return (
    <div className="w-[272px] border-l border-neutral-200 dark:border-neutral-800 ml-auto lg:p-250 space-y-3">
      <Button intent="secondary" text="Archive Note" icon={<Archive className={iconClassName} />} />
      <Button intent="secondary" text="Delete Note" icon={<Delete className={iconClassName} />} />
    </div>
  )
}