import { useNotesStore } from "@/store/notes/useNotesStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useRestoreModal({ isMobile }: { isMobile: boolean }) {
  const { selectedNote, restoreNote, fetchNotes } = useNotesStore();
  const [isOpenRestoreModal, setIsOpenRestoreModal] = useState(false);
  const router = useRouter();

  function handleOpenChangeRestore() {
    setIsOpenRestoreModal((prev) => !prev);
  }

  async function handleConfirmRestore() {
    await restoreNote(selectedNote?.id as string);
    handleOpenChangeRestore();

    if (isMobile) router.back();
  }

  return {
    isOpenRestoreModal,
    handleOpenChangeRestore,
    handleConfirmRestore
  };
}
