import Link from "next/link";
import { Search } from "../ui/icons/search";
import { Setting } from "../ui/icons/setting";
import { Input } from "../ui/input";

export function PageHeaderDesktop() {
  return (
    <header className="flex h-[5.0625rem] w-full items-center justify-between border-b border-neutral-200 px-400 dark:border-neutral-800">
      <h1 className="text-preset-1 text-neutral-950 dark:text-white">
        All Notes
      </h1>

      <div className="flex items-center gap-6">
        <Input
          leftIcon={<Search className="cursor-custom" />}
          placeholder="Search by title, content, or tags…"
        />
        <Link href="/settings" className="flex h-10 w-10 items-center justify-center">
          <Setting className="cursor-custom hover:opacity-[0.7]" />
        </Link>
      </div>
    </header>
  );
}
