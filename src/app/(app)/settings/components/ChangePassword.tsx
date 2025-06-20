"use client";
import { Preset1, Preset4 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "@/components/ui/icons/arrow-left2";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/use-api";
import { useResponsive } from "@/hooks/use-responsive";
import { useToaster } from "@/hooks/useToaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const changePasswordFormSchema = z.object({
  oldPassword: z.string().min(8, "At least 8 characters"),
  newPassword: z.string().min(8, "At least 8 characters"),
  confirmPassword: z.string().min(8, "At least 8 characters"),
});

type ChangePasswordForm = z.infer<typeof changePasswordFormSchema>;

export function ChangePassword() {
  const { isDesktop } = useResponsive();
  const router = useRouter();
  const { post } = useApi();
  const { success } = useToaster();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const oldPasswordError = errors.oldPassword?.message;
  const newPasswordError = errors.newPassword?.message;
  let confirmPasswordError = errors.confirmPassword?.message;

  async function handleSubmitForm(data: ChangePasswordForm) {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      await post("/users/change-password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      reset();
      success("Settings updated successfully!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={twMerge(
        "mt-6 px-4 md:px-8 lg:mt-8",
        isDesktop ? "w-[538px]" : "w-full",
      )}
    >
      {!isDesktop && (
        <button
          className="flex items-center gap-2"
          onClick={() => router.push("/settings")}
        >
          <ArrowLeft2 width={20} height={20} />
          <Preset4 className="mt-1 text-neutral-600 dark:text-neutral-300">
            Settings
          </Preset4>
        </button>
      )}

      <Preset1 className="mt-3">Change Password</Preset1>

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="mt-6 flex flex-col gap-6"
      >
        <Input
          label="Old Password"
          type="password"
          showPasswordToggle
          error={oldPasswordError}
          {...register("oldPassword")}
        />

        <Input
          label="New Password"
          type="password"
          showPasswordToggle
          hint="At least 8 characters"
          error={newPasswordError}
          {...register("newPassword")}
        />

        <Input
          label="Confirm New Password"
          type="password"
          showPasswordToggle
          error={confirmPasswordError}
          {...register("confirmPassword")}
        />

        <div className="mt-6 ml-auto w-[132px]">
          <Button intent="primary" text="Save Changes" type="submit" />
        </div>
      </form>
    </div>
  );
}
