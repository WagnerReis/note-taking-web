import { Button } from "@/components/ui/button";
import { Archive } from "@/components/ui/icons/archive";
import { Delete } from "@/components/ui/icons/delete";
import { useNotesStore } from "@/store/notes/useNotesStore";
import { useState } from "react";
import { ModalArchive } from "./ModalArchive";
import { ModalDelete } from "./ModalDelete";

export function SidebarRight() {
  const { selectedNote, removeNote, archiveNote } = useNotesStore();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenArchiveModal, setIsOpenArchiveModal] = useState(false);

  const iconClassName = "text-black dark:text-white";

  function handleOpenChangeDelete() {
    setIsOpenDeleteModal((prev) => !prev);
  }

   function handleOpenChangeArchive() {
    setIsOpenArchiveModal((prev) => !prev);
  }

  async function handleConfirmDelete() {
    await removeNote(selectedNote?.id as string);
    handleOpenChangeDelete();
  }

  async function handleConfirmArchive() {
    await archiveNote(selectedNote?.id as string);
    handleOpenChangeArchive();
  }

  return (
    <div className="ml-auto min-w-[272px] space-y-3 border-l border-neutral-200 lg:p-250 dark:border-neutral-800">
      <Button
        intent="secondary"
        text="Archive Note"
        icon={<Archive className={iconClassName} />}
        onClick={handleOpenChangeArchive}
      />

      <Button
        intent="secondary"
        text="Delete Note"
        icon={<Delete className={iconClassName} />}
        onClick={handleOpenChangeDelete}
      />

      <ModalDelete
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        handleConfirm={handleConfirmDelete}
      />
      
      <ModalArchive 
        isOpen={isOpenArchiveModal}
        setIsOpen={setIsOpenArchiveModal}
        handleConfirm={handleConfirmArchive}
      />
    </div>
  );
}
