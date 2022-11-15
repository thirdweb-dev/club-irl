import { Icon, IconProps } from "@chakra-ui/react";
import type { FC } from "react";

export const UserIcon: FC<IconProps> = ({ ...otherProps }) => {
  return (
    <Icon
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        d="M9.64844 0C4.68044 0 0.648438 4.032 0.648438 9C0.648438 13.968 4.68044 18 9.64844 18C14.6164 18 18.6484 13.968 18.6484 9C18.6484 4.032 14.6164 0 9.64844 0ZM9.64844 2.7C11.1424 2.7 12.3484 3.906 12.3484 5.4C12.3484 6.894 11.1424 8.1 9.64844 8.1C8.15444 8.1 6.94844 6.894 6.94844 5.4C6.94844 3.906 8.15444 2.7 9.64844 2.7ZM9.64844 15.48C7.39844 15.48 5.40944 14.328 4.24844 12.582C4.27544 10.791 7.84844 9.81 9.64844 9.81C11.4394 9.81 15.0214 10.791 15.0484 12.582C13.8874 14.328 11.8984 15.48 9.64844 15.48Z"
        fill="url(#paint0_linear_427_414)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_427_414"
          x1="9.64843"
          y1="0.900004"
          x2="17.2636"
          y2="9.2788"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F213A4" />
          <stop offset="1" stopColor="#7A66FF" />
        </linearGradient>
      </defs>
    </Icon>
  );
};
