import { Preset5 } from "@/components/Typography";
import { Archive } from "@/components/ui/icons/archive";
import { ArrowLeft2 } from "@/components/ui/icons/arrow-left2";
import { Delete } from "@/components/ui/icons/delete";
import { RefreshLeft } from "@/components/ui/icons/refresh-left";
import { useArchiveModal } from "@/hooks/use-archive-modal";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { useRestoreModal } from "@/hooks/use-restore-modal";
import { useNotesStore } from "@/store/notes/useNotesStore";
import { useRouter } from "next/navigation";
import { ModalArchive } from "./ModalArchive";
import { ModalDelete } from "./ModalDelete";
import { ModalRestore } from "./ModalRestore";

export function MobilePageHeaderControl() {
  const router = useRouter();
  const { isArchived } = useNotesStore();
  const { isOpenDeleteModal, handleOpenChangeDelete, handleConfirmDelete } =
    useDeleteModal({ isMobile: true });
  const { isOpenArchiveModal, handleOpenChangeArchive, handleConfirmArchive } =
    useArchiveModal({ isMobile: true });
  const { isOpenRestoreModal, handleOpenChangeRestore, handleConfirmRestore } =
    useRestoreModal({ isMobile: true });

  return (
    <div className="flex h-[30px] w-full justify-between border-b border-neutral-200 pb-2 md:h-[50px] dark:border-neutral-800">
      <div
        className="flex cursor-pointer items-center gap-1"
        onClick={() => router.back()}
      >
        <ArrowLeft2 className="h-[18px] w-[18px]" />
        <Preset5 className="text-neutral-600 dark:text-neutral-300">
          Go Back
        </Preset5>
      </div>

      <div className="flex items-center gap-4">
        <button type="button" onClick={handleOpenChangeDelete}>
          <Delete className="h-[18px] w-[18px]" />
        </button>

        <button
          type="button"
          onClick={
            isArchived ? handleOpenChangeRestore : handleOpenChangeArchive
          }
        >
          {isArchived ? (
            <RefreshLeft className="h-[18px] w-[18px]" />
          ) : (
            <Archive className="h-[18px] w-[18px]" />
          )}
        </button>

        <div
          className="mt-[2px] text-neutral-600 dark:text-neutral-300"
          onClick={() => router.back()}
        >
          <Preset5>Cancel</Preset5>
        </div>
        <button type="submit">
          <Preset5 className="mt-[2px] text-blue-500">Save Note</Preset5>
        </button>
      </div>

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

      <ModalRestore
        isOpen={isOpenRestoreModal}
        setIsOpen={handleOpenChangeRestore}
        handleConfirm={handleConfirmRestore}
      />
    </div>
  );
}
