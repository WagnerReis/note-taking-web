"use client";
import { Preset1, Preset3, Preset5 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Logo } from "@/components/ui/icons/logo";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { GoogleLogo } from "phosphor-react";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

export default function Login() {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <main
      className={twMerge(
        "flex w-[343px] flex-col bg-white md:w-[540px] dark:bg-neutral-950",
        "shadow-small border border-neutral-200 px-200 dark:border-neutral-800",
        "rounded-16 items-center gap-4 py-600 md:px-600",
      )}
    >
      <Logo width={95} height={28} />

      <section className="mt-2">
        <Preset1>Welcome to note</Preset1>
        <Preset5 className="mt-2 text-center text-neutral-600 dark:text-neutral-300">
          Please log in to continue
        </Preset5>
      </section>

      <form action="" className="flex w-full flex-col gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="email@example.com"
          ref={ref}
        />

        <Input label="Password" type="password" showPasswordToggle ref={ref} />

        <Button intent="primary" text="Login" />
      </form>

      <Divider className="mt-1" />
      <section className="w-full space-y-4">
        <Preset5 className="text-center text-neutral-300 dark:text-neutral-600">
          Or log in with:
        </Preset5>

        <button
          className={twMerge(
            "rounded-12 flex h-[43px] w-full cursor-pointer",
            "items-center justify-center gap-3 border border-neutral-300 dark:border-neutral-600",
            "hover:bg-neutral-50 dark:hover:bg-neutral-900",
          )}
        >
          <GoogleLogo size={20} weight="bold" />
          <Preset3 className="text-neutral-950 dark:text-white">Google</Preset3>
        </button>
      </section>
      <Divider />
      <Preset5 className="mt-2 text-neutral-300 dark:text-neutral-600">
        No account yet?{" "}
        <Link href="/register" className="text-neutral-950 dark:text-white">
          Sign Up
        </Link>
      </Preset5>
    </main>
  );
}
