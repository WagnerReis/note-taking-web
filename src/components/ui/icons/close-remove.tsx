import { IconProps } from "@/types";
import BaseIcon from "./base-icon";

export function CloseRemove(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}
