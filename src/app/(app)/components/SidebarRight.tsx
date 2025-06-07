import { Button } from "@/components/ui/button";
import { Archive } from "@/components/ui/icons/archive";
import { Delete } from "@/components/ui/icons/delete";
import { useNotesStore } from "@/store/notes/useNotesStore";
import { useState } from "react";
import { ModalDelete } from "./ModalDelete";

export function SidebarRight() {
  const { selectedNote, removeNote } = useNotesStore();
  const [isOpen, setIsOpen] = useState(false);

  const iconClassName = "text-black dark:text-white";

  function handleOpenChange() {
    setIsOpen((prev) => !prev);
  }

  async function handleConfirm() {
    await removeNote(selectedNote?.id as string);
    handleOpenChange();
  }

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
        onClick={handleOpenChange}
      />
      <ModalDelete
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleConfirm={handleConfirm}
      />
    </div>
  );
}
