"use client";
import { Preset5 } from "@/components/typography";
import { AuthFormContainer } from "../components/AuthFormContainer";
import { LoginForm } from "../components/LoginForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <AuthFormContainer
      title="Create Your Account"
      subtitle="Sign up to start organizing your notes and boost your productivity."
      footer={
        <Preset5 className="mt-2 text-neutral-300 dark:text-neutral-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="cursor-custom text-neutral-950 dark:text-white"
          >
            Login
          </Link>
        </Preset5>
      }
    >
      <LoginForm />
    </AuthFormContainer>
  );
}
