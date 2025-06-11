import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { cloneElement, ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import { Preset3, Preset5 } from "./Typography";
import { Button } from "./ui/button";
import { Divider } from "./ui/divider";

interface ModalProps {
  open: boolean;
  icon: ReactElement<any, any>;
  title: string;
  description: string;
  type: "archive" | "delete" | "restore";
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function Modal({
  open,
  onOpenChange,
  icon,
  title,
  description,
  type,
  onConfirm,
}: ModalProps) {
  function getConfirmButtonText() {
    if (type === "archive") return "Archive";
    if (type === "delete") return "Delete";
    if (type === "restore") return "Restore";
    return "Confirm";
  }

  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(!open)}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-40 bg-black/50">
          <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in">
            <div
              className={twMerge(
                "rounded-12 min-h-[193px] w-[343px] bg-white md:h-[174px] md:w-[440px] dark:bg-neutral-700",
                "border border-neutral-200 dark:border-neutral-600",
              )}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-8 flex min-h-10 min-w-10 items-center justify-center bg-neutral-100 dark:bg-neutral-600">
                    {icon &&
                      cloneElement(icon, {
                        className: icon.props?.className,
                      })}
                  </div>

                  <div>
                    <DialogTitle className="mb-2 text-lg font-semibold">
                      <Preset3>{title}</Preset3>
                    </DialogTitle>
                    <div className="mb-4 text-gray-600">
                      <Preset5 className="text-neutral-700 dark:text-neutral-200">
                        {description}
                      </Preset5>
                    </div>
                  </div>
                </div>
              </div>
              <Divider className="border border-neutral-200 dark:border-neutral-600" />

              <div className="flex w-full justify-end gap-4 py-4 pr-5">
                <Button
                  intent="tertiary"
                  text="Cancel"
                  className="h-[41px] w-[78px]"
                  onClick={() => onOpenChange(!open)}
                />
                <Button
                  intent={
                    type === "archive" || type === "restore"
                      ? "primary"
                      : "destructive"
                  }
                  text={getConfirmButtonText()}
                  className="h-[41px] w-[110px]"
                  onClick={onConfirm}
                />
              </div>
            </div>
          </div>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
