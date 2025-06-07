import { Modal } from "@/components/Modal";
import { Delete } from "@/components/ui/icons/delete";

interface ModalDeleteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleConfirm: () => void;
}

export function ModalDelete({
  isOpen,
  setIsOpen,
  handleConfirm,
}: ModalDeleteProps) {
  return (
    <Modal
      open={isOpen}
      onOpenChange={setIsOpen}
      icon={<Delete className="h-6 w-6" />}
      title="Delete Note"
      description="Are you sure you want to permanently delete this note? This action cannot be undone."
      type="delete"
      onConfirm={handleConfirm}
    />
  );
}
