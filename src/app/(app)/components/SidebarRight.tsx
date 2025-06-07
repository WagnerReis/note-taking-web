import { Button } from "@/components/ui/button";
import { Archive } from "@/components/ui/icons/archive";
import { Delete } from "@/components/ui/icons/delete";
import { useArchiveModal } from "@/hooks/use-archive-modal";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { ModalArchive } from "./ModalArchive";
import { ModalDelete } from "./ModalDelete";

export function SidebarRight() {
  const { isOpenDeleteModal, handleOpenChangeDelete, handleConfirmDelete } =
    useDeleteModal({ isMobile: false });
  const { isOpenArchiveModal, handleOpenChangeArchive, handleConfirmArchive } =
    useArchiveModal({ isMobile: false });

  const iconClassName = "text-black dark:text-white";

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
        setIsOpen={handleOpenChangeDelete}
        handleConfirm={handleConfirmDelete}
      />

      <ModalArchive
        isOpen={isOpenArchiveModal}
        setIsOpen={handleOpenChangeArchive}
        handleConfirm={handleConfirmArchive}
      />
    </div>
  );
}
