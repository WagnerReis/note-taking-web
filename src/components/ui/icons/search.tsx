import { IconProps } from "@/types";
import BaseIcon from "./base-icon";

export function Search(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2485 3.50024C7.22315 3.50024 3.95996 6.76343 3.95996 10.7888C3.95996 14.8141 7.22315 18.0773 11.2485 18.0773C15.2738 18.0773 18.537 14.8141 18.537 10.7888C18.537 6.76343 15.2738 3.50024 11.2485 3.50024ZM2.45996 10.7888C2.45996 5.93501 6.39472 2.00024 11.2485 2.00024C16.1023 2.00024 20.037 5.93501 20.037 10.7888C20.037 15.6426 16.1023 19.5773 11.2485 19.5773C6.39472 19.5773 2.45996 15.6426 2.45996 10.7888Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7361 15.6477L22.3516 21.2486L21.2923 22.3106L15.6768 16.7097L16.7361 15.6477Z"
        fill="currentColor"
      />
    </BaseIcon>
  );
}
