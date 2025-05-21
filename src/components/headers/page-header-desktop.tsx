import { Search } from "../ui/icons/search";
import { Setting } from "../ui/icons/setting";
import { twMerge } from "tailwind-merge";

export function PageHeaderDesktop() {
  return (
    <header className="flex items-center justify-between px-400 w-full h-[5.0625rem] border-b border-neutral-200 dark:border-neutral-800">
      <h1 className="text-preset-1 text-neutral-950 dark:text-white">
        All Notes
      </h1>

      <div className="flex items-center gap-6">
        <SearchInput />
        <div className="w-10 h-10 flex items-center justify-center">
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
          "w-[300px] h-[44px] pl-[44px] pr-[16px] rounded-8 border border-neutral-200 dark:border-neutral-600",
          "placeholder-neutral-500 dark:placeholder-neutral-400 text-foreground outline-none text-preset-5",
        )}
      />
      <Search className="absolute top-[12px] left-[16px] w-5 h-5" />
    </div>
  );
}
