import { useNotesStore } from "@/store/notes/useNotesStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useDeleteModal({ isMobile }: { isMobile: boolean }) {
  const { selectedNote, removeNote } = useNotesStore();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const router = useRouter();

  function handleOpenChangeDelete() {
    setIsOpenDeleteModal((prev) => !prev);
  }

  async function handleConfirmDelete() {
    await removeNote(selectedNote?.id as string);
    handleOpenChangeDelete();

    if (isMobile) router.back();
  }

  return {
    isOpenDeleteModal,
    handleOpenChangeDelete,
    handleConfirmDelete,
  };
}
