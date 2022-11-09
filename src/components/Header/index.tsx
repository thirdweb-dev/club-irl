import { Box, Image } from "@chakra-ui/react";
import { useContract, useNFTBalance, useUser } from "@thirdweb-dev/react";
import {
  useProgram,
  useUser as useUserSolana,
  useNFTs,
} from "@thirdweb-dev/react/solana";
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
  const { program } = useProgram(
    process.env.NEXT_PUBLIC_THIRDWEB_PROGRAM_ADDRESS,
    "nft-drop"
  );
  const { user: userSolana } = useUserSolana();
  const { data: nfts } = useNFTs(program);
  const hasNFT = nfts?.some((nft) => nft.owner === userSolana?.address);

  return (
    <Box w="100%" pos="absolute" top={0}>
      {(balance?.gt(0) || hasNFT) && <Nav />}
      <Box width="230px" height="150px">
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
    </Box>
  );
};
