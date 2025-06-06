import { Button } from "@/components/ui/button";
import { Archive } from "@/components/ui/icons/archive";
import { Delete } from "@/components/ui/icons/delete";

export function SidebarRight() {
  const iconClassName = "text-black dark:text-white";

  return (
    <div className="ml-auto min-w-[272px] space-y-3 border-l border-neutral-200 lg:p-250 dark:border-neutral-800">
      <Button
        intent="secondary"
        text="Archive Note"
        icon={<Archive className={iconClassName} />}
      />
      <Button
        intent="secondary"
        text="Delete Note"
        icon={<Delete className={iconClassName} />}
      />
    </div>
  );
}
