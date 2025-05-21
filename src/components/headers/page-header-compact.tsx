import { Logo } from "../ui/icons/logo";

export function PageHeaderCompact() {
  return (
    <header className="flex items-center w-full px-200 h-[54px] md:h-[74px] md:px-400 sm:flex md:flex lg:flex xl:hidden bg-neutral-100 dark:bg-neutral-800">
      <Logo width={95} height={28} />
    </header>
  );
}
