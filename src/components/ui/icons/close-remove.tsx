"use client";
import { IconProps } from "@/types";
import BaseIcon from "./base-icon";

export function CloseRemove(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </BaseIcon>
  );
}
