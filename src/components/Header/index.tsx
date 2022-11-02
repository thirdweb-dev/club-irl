import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { CalendarIcon, UserIcon } from "../../Icons";
import { Nav } from "./Nav";

interface IHeaderProps {
  showNav?: boolean;
}

export const Header: FC<IHeaderProps> = ({ showNav }) => {
  return (
    <Box w="100%" pos="absolute" top={0}>
      {showNav && <Nav />}
      <Link href="/">
        <Image
          src="/assets/logo.svg"
          alt=""
          width={230}
          height={150}
          style={{
            objectFit: "cover",
            margin: "60px",
          }}
        />
      </Link>
    </Box>
  );
};
