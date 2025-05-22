import { Search } from "../ui/icons/search";
import { Setting } from "../ui/icons/setting";
import { twMerge } from "tailwind-merge";

export function PageHeaderDesktop() {
  return (
    <header className="flex h-[5.0625rem] w-full items-center justify-between border-b border-neutral-200 px-400 dark:border-neutral-800">
      <h1 className="text-preset-1 text-neutral-950 dark:text-white">
        All Notes
      </h1>

      <div className="flex items-center gap-6">
        <SearchInput />
        <div className="flex h-10 w-10 items-center justify-center">
          <Setting className="cursor-pointer hover:opacity-[0.7]" />
        </div>
      </div>
    </header>
  );
}

function SearchInput() {
  return (
    <div className="relative">
      <input
        type="text"
        name=""
        id=""
        placeholder="Search by title, content, or tags…"
        className={twMerge(
          "rounded-8 h-[44px] w-[300px] border border-neutral-200 pr-[16px] pl-[44px] dark:border-neutral-600",
          "text-foreground text-preset-5 placeholder-neutral-500 outline-none dark:placeholder-neutral-400",
        )}
      />
      <Search className="absolute top-[12px] left-[16px] h-5 w-5" />
    </div>
  );
}
