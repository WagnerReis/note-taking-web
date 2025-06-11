import { useNotesStore } from "@/store/notes/useNotesStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToaster } from "./useToaster";

export function useDeleteModal({ isMobile }: { isMobile: boolean }) {
  const { selectedNote, removeNote } = useNotesStore();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const router = useRouter();
  const { success, error } = useToaster();

  function handleOpenChangeDelete() {
    setIsOpenDeleteModal((prev) => !prev);
  }

  async function handleConfirmDelete() {
    try {
      await removeNote(selectedNote?.id as string);
      handleOpenChangeDelete();
      success("Note permanently deleted.");

      if (isMobile) router.back();
    } catch (e) {
      console.error(e);
      error("Algo deu errado. Tente novamente.");
    }
  }

  return {
    isOpenDeleteModal,
    handleOpenChangeDelete,
    handleConfirmDelete,
  };
}
