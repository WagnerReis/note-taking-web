import { Logo } from "../ui/icons/logo";

export function PageHeaderCompact() {
  return (
    <header className="flex h-[54px] w-full items-center bg-neutral-100 px-200 sm:flex md:flex md:h-[74px] md:px-400 lg:flex xl:hidden dark:bg-neutral-800">
      <Logo width={95} height={28} />
    </header>
  );
}
