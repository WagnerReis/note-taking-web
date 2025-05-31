"use client";
import { Preset5 } from "@/components/Typography";
import { AuthFormContainer } from "../components/AuthFormContainer";
import { LoginForm } from "../components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthFormContainer
      title="Welcome to note"
      subtitle="Please log in to continue"
      footer={
        <Preset5 className="mt-2 text-neutral-300 dark:text-neutral-600">
          No account yet?{" "}
          <Link
            href="/register"
            className="cursor-custom text-neutral-950 dark:text-white"
          >
            Sign Up
          </Link>
        </Preset5>
      }
    >
      <LoginForm apiPath="/auth/login" buttonLabel="Login" />
    </AuthFormContainer>
  );
}
