import { IconProps } from "@/types";
import BaseIcon from "./base-icon";

export function Padlock(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M16.4237 9.4478V7.3008C16.4237 4.7878 14.3857 2.74975 11.8727 2.74975C9.35973 2.7388 7.31373 4.7668 7.30273 7.2808V7.3008V9.4478"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.683 21.2496H8.042C5.948 21.2496 4.25 19.5526 4.25 17.4576V13.1686C4.25 11.0736 5.948 9.3766 8.042 9.3766H15.683C17.777 9.3766 19.475 11.0736 19.475 13.1686V17.4576C19.475 19.5526 17.777 21.2496 15.683 21.2496Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8623 14.2027V16.4237"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}
