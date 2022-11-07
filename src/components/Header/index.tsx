import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import type { FC } from "react";
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
          objectFit="cover"
          margin={{
            base: "0 auto",
            md: "60px",
          }}
        />
      </Link>
    </Box>
  );
};
