import { Preset5 } from "@/components/Typography";
import { Archive } from "@/components/ui/icons/archive";
import { ArrowLeft2 } from "@/components/ui/icons/arrow-left2";
import { Delete } from "@/components/ui/icons/delete";
import { useRouter } from "next/navigation";

export function MobilePageHeaderControl() {
  const router = useRouter();

  return (
    <div className="flex pb-2 h-[30px] md:h-[50px] w-full justify-between border-b border-neutral-200 dark:border-neutral-800">
        <div 
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft2 className="w-[18px] h-[18px]" />
          <Preset5 className="text-neutral-600 dark:text-neutral-300">Go Back</Preset5>
        </div>

        <div className="flex items-center gap-4">
          <Delete className="w-[18px] h-[18px]" />
          <Archive className="w-[18px] h-[18px]" />
          <div 
          className="text-neutral-600 dark:text-neutral-300 mt-[2px]"
          onClick={() => router.back()}><Preset5>Cancel</Preset5></div>
          <Preset5 className="text-blue-500 mt-[2px]">Save Note</Preset5>
        </div>
    </div>
  )
}