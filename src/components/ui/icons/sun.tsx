import { IconProps } from "@/types";
import BaseIcon from "./base-icon";

export function Sun(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M12.0548 2.99994V4.37184M12.0548 19.628V20.9999M21.0547 12H19.6828M4.42659 12H3.05469M18.4185 5.63576L17.4485 6.60583M6.66105 17.3937L5.69099 18.3638M18.4185 18.3638L17.4485 17.3937M6.66105 6.6063L5.69099 5.63624"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0549 7.80463C14.3725 7.80463 16.2504 9.68345 16.2504 12.0001C16.2504 14.3177 14.3725 16.1965 12.0549 16.1965C9.73723 16.1965 7.85938 14.3177 7.85938 12.0001C7.85938 9.68345 9.73723 7.80463 12.0549 7.80463Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}
