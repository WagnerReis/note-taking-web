import { useNotesStore } from "@/store/notes/useNotesStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useArchiveModal({ isMobile }: { isMobile: boolean }) {
  const { selectedNote, archiveNote } = useNotesStore();
  const [isOpenArchiveModal, setIsOpenArchiveModal] = useState(false);
  const router = useRouter();

  function handleOpenChangeArchive() {
    setIsOpenArchiveModal((prev) => !prev);
  }

  async function handleConfirmArchive() {
    await archiveNote(selectedNote?.id as string);
    handleOpenChangeArchive();

    if (isMobile) router.back();
  }

  return {
    isOpenArchiveModal,
    handleOpenChangeArchive,
    handleConfirmArchive,
  };
}
