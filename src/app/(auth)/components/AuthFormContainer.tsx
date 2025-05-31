import { Preset1, Preset3, Preset5 } from "@/components/Typography";
import { Divider } from "@/components/ui/divider";
import { Logo } from "@/components/ui/icons/logo";
import { GoogleLogo } from "phosphor-react";
import { twMerge } from "tailwind-merge";

interface AuthFormContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthFormContainer({
  title,
  subtitle,
  children,
  footer,
}: AuthFormContainerProps) {
  return (
    <main
      className={twMerge(
        "flex w-[343px] flex-col bg-white md:w-[540px] dark:bg-neutral-950",
        "shadow-small border border-neutral-200 px-200 dark:border-neutral-800",
        "rounded-16 items-center gap-4 py-600 md:px-600",
      )}
    >
      <Logo width={95} height={28} />

      <section className="mt-2 text-center">
        <Preset1>{title}</Preset1>
        <Preset5 className="mt-2 text-neutral-600 dark:text-neutral-300">
          {subtitle}
        </Preset5>
      </section>

      {children}

      <Divider className="mt-1" />
      <section className="w-full space-y-4">
        <Preset5 className="text-center text-neutral-300 dark:text-neutral-600">
          Or log in with:
        </Preset5>

        <button
          className={twMerge(
            "rounded-12 cursor-custom flex h-[43px] w-full",
            "items-center justify-center gap-3 border border-neutral-300 dark:border-neutral-600",
            "hover:bg-neutral-50 dark:hover:bg-neutral-900",
          )}
          type="button"
          onClick={() =>
            (window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`)
          }
        >
          <GoogleLogo size={20} weight="bold" />
          <Preset3 className="text-neutral-950 dark:text-white">Google</Preset3>
        </button>
      </section>

      <Divider />
      {footer}
    </main>
  );
}
