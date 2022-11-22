import { Icon, IconProps } from "@chakra-ui/react";
import type { FC } from "react";

export const CalendarIcon: FC<IconProps> = ({ ...otherProps }) => {
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
        d="M16.5984 1.63636H15.6984V0H13.8984V1.63636H4.89844V0H3.09844V1.63636H2.19844C1.20844 1.63636 0.398438 2.37273 0.398438 3.27273V16.3636C0.398438 17.2636 1.20844 18 2.19844 18H16.5984C17.5884 18 18.3984 17.2636 18.3984 16.3636V3.27273C18.3984 2.37273 17.5884 1.63636 16.5984 1.63636ZM16.5984 16.3636H2.19844V5.72727H16.5984V16.3636Z"
        fill="url(#paint0_linear_427_413)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_427_413"
          x1="0.768808"
          y1="3.53107e-06"
          x2="19.3825"
          y2="1.08269"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F213A4" />
          <stop offset="1" stopColor="#7A66FF" />
        </linearGradient>
      </defs>
    </Icon>
  );
};
