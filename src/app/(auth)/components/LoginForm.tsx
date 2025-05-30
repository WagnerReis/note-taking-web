"use client";
import { Preset5 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormDataType = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  apiPath: string;
  buttonLabel: string;
}

export function LoginForm({ apiPath, buttonLabel }: LoginFormProps) {
  const router = useRouter();
  const [credentialsError, setCredentialsError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormDataType>({
    resolver: zodResolver(loginFormSchema),
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  async function onSubmit(data: LoginFormDataType) {
    const response = await fetchWithAuth<{ status: number }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${apiPath}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      },
    );

    if (response.status === 200) {
      reset();
      return router.push("/");
    }

    setCredentialsError("Invalid email or password");
  }

  return (
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
        isLogin
        error={passwordError}
        {...register("password")}
      />
      {credentialsError && (
        <Preset5 className="mt-2 text-center text-red-500">
          {credentialsError}
        </Preset5>
      )}
      <Button intent="primary" text={buttonLabel} type="submit" />
    </form>
  );
}
