import { Box, Image, Heading } from "@chakra-ui/react";
import { useContract, useNFTBalance, useUser } from "@thirdweb-dev/react";
import Link from "next/link";
import type { FC } from "react";
import { Nav } from "./Nav";

export const Header: FC = () => {
  const { user } = useUser();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS || "",
    "edition-drop"
  );
  const { data: balance } = useNFTBalance(contract, user?.address, "0");

  return (
    <Box w="100%" pos="absolute" top={0}>
      {balance?.gt(0) && <Nav />}
      <Box width="230px" height="150px" margin="0 auto">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt=""
            width={230}
            height={150}
            objectFit="cover"
            margin="0 auto"
          />
        </Link>
        <Heading
          size="xs"
          mb="10px"
          textAlign="center"
          fontWeight="500"
          color="#FFFFFF"
          textShadow="0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(139, 56, 255, 0.9)"
        >
          presented by thirdweb
        </Heading>
      </Box>
    </Box>
  );
};
