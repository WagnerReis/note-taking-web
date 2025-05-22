"use client";
import { Preset1, Preset3, Preset5 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Hide } from "@/components/ui/icons/hide";
import { Logo } from "@/components/ui/icons/logo";
import { Show } from "@/components/ui/icons/show";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Login() {
  const ref = useRef<HTMLInputElement>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleTogglePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev);
  }

  return (
    <main
      className={twMerge(
        "flex flex-col bg-white dark:bg-neutral-950 w-[343px] md:w-[540px]",
        "border border-neutral-200 dark:border-neutral-800 shadow-small px-200",
        "items-center gap-4 py-600 rounded-16 md:px-600",
      )}
    >
      <Logo width={95} height={28} />

      <section className="mt-2">
        <Preset1>Welcome to note</Preset1>
        <Preset5 className="text-center text-neutral-600 dark:text-neutral-300 mt-2">
          Please log in to continue
        </Preset5>
      </section>

      <form action="" className="flex flex-col w-full gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="example@email.com"
          ref={ref}
        />

        <Input
          label="Password"
          type={isPasswordVisible ? "text" : "password"}
          rightIcon={
            !isPasswordVisible ? (
              <Show className="w-5 h-5" />
            ) : (
              <Hide className="w-5 h-5" />
            )
          }
          passwordToggleVisibility={handleTogglePasswordVisibility}
          ref={ref}
        />

        <Button intent="primary" text="Login" />
      </form>

      <Divider />
      <section className="w-full space-y-4">
        <Preset5 className="text-center text-neutral-300 dark:text-neutral-600">
          Or log in with:
        </Preset5>

        <button className="flex gap-3 items-center justify-center border border-neutral-300 dark:border-neutral-600 w-full h-[43px] rounded-12">
          <p>g</p>
          <Preset3 className="text-neutral-950 dark:text-white">Google</Preset3>
        </button>
      </section>
      <Divider />
      <Preset5 className="text-neutral-300 dark:text-neutral-600">
        No account yet?{" "}
        <Link href="/register" className="text-neutral-950 dark:text-white">
          Sign Up
        </Link>
      </Preset5>
    </main>
  );
}
