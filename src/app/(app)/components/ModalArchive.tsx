import { Modal } from "@/components/Modal";
import { Archive } from "@/components/ui/icons/archive";

interface ModalArchiveProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleConfirm: () => void;
}

export function ModalArchive({
  isOpen,
  setIsOpen,
  handleConfirm,
}: ModalArchiveProps) {
  return (
    <Modal
      open={isOpen}
      onOpenChange={setIsOpen}
      icon={<Archive className="h-6 w-6" />}
      title="Archive Note"
      description="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
      type="archive"
      onConfirm={handleConfirm}
    />
  );
}
