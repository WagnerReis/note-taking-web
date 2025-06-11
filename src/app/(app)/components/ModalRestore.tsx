import { Modal } from "@/components/Modal";
import { RefreshLeft } from "@/components/ui/icons/refresh-left";

interface ModalRestoreProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleConfirm: () => void;
}

export function ModalRestore({
  isOpen,
  setIsOpen,
  handleConfirm,
}: ModalRestoreProps) {
  return (
    <Modal
      open={isOpen}
      onOpenChange={setIsOpen}
      icon={<RefreshLeft className="h-6 w-6" />}
      title="Restore Note"
      description="Are you sure you want to Restore this note? You can find it in the All Notes section."
      type="restore"
      onConfirm={handleConfirm}
    />
  );
}
