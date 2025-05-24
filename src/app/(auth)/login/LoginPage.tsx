"use client";
import { Preset1, Preset3, Preset5 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Logo } from "@/components/ui/icons/logo";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleLogo } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormDataType = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [credentialsError, setCredentialsError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormDataType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  async function onSubmit(data: LoginFormDataType) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      },
    );

    if (response.status === 200) {
      reset();
      router.push("/");
    }

    setCredentialsError("Invalid email or password");
  }

  async function handleGoogleLogin() {
    window.location.href = "http://localhost:3000/api/auth/google";
  }

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Input
          label="Email Address"
          placeholder="email@example.com"
          error={emailError}
          {...register("email")}
        />

        <Input
          label="Password"
          type="password"
          showPasswordToggle
          error={passwordError}
          {...register("password")}
        />

        {credentialsError && (
          <Preset5 className="mt-2 text-center text-red-500">
            {credentialsError}
          </Preset5>
        )}

        <Button intent="primary" text="Login" type="submit" />
      </form>

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
          onClick={handleGoogleLogin}
        >
          <GoogleLogo size={20} weight="bold" />
          <Preset3 className="text-neutral-950 dark:text-white">Google</Preset3>
        </button>
      </section>
      <Divider />
      <Preset5 className="mt-2 text-neutral-300 dark:text-neutral-600">
        No account yet?{" "}
        <Link
          href="/register"
          className="cursor-custom text-neutral-950 dark:text-white"
        >
          Sign Up
        </Link>
      </Preset5>
    </main>
  );
}
