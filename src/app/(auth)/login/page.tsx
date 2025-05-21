import { Preset1, Preset3, Preset5 } from "@/components/typography";
import { Divider } from "@/components/ui/divider";
import { Logo } from "@/components/ui/icons/logo";
import Link from "next/link";
import { twJoin } from "tailwind-merge";

export default function Login() {
  return (
    <main
      className={twJoin(
        "flex flex-col bg-white dark:bg-neutral-950 w-[343px] lg:w-[540px]",
        "border border-neutral-200 dark:border-neutral-800 shadow-small px-200",
        "items-center gap-4 py-600 rounded-16",
      )}
    >
      <Logo width={95} height={28} />

      <section className="mt-2">
        <Preset1>Welcome to note</Preset1>
        <Preset5 className="text-center text-neutral-600 dark:text-neutral-300 mt-2">
          Please log in to continue
        </Preset5>
      </section>

      <form action="" className="flex flex-col">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" placeholder="Email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="" />

        <button>Login</button>
      </form>

      <Divider />
      <section className="w-full space-y-4">
        <Preset5 className="text-center text-neutral-300 dark:text-neutral-600">
          Or log in with:
        </Preset5>

        <button className="flex gap-3 items-center justify-center border border-neutral-300 dark:border-0neutral-600 w-full h-[43px] rounded-12">
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
