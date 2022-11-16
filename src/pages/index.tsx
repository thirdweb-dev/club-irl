import { Nav } from "@/components/Header/Nav";
import { ArrowsIcon } from "@/Icons";
import { Box, Button, Flex, Link, Spinner, Text } from "@chakra-ui/react";
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useClaimIneligibilityReasons,
  useContract,
  useLogin,
  useNFTBalance,
  useUser,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Image from "next/image";

const tokenId = 0;

const Home: NextPage = () => {
  const { user } = useUser();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS || "",
    "edition-drop"
  );
  const { data: balance } = useNFTBalance(contract, user?.address, tokenId);
  const { data: ineligibility, isLoading } = useClaimIneligibilityReasons(
    contract,
    { walletAddress: user?.address || "", quantity: 1 },
    tokenId
  );
  const address = useAddress();
  const login = useLogin();

  if (isLoading && user?.address) {
    return (
      <Flex
        position="fixed"
        top="0"
        left="0"
        direction="column"
        align="center"
        justify="center"
        height="100vh"
        width="100vw"
        bg="url('/assets/home-bg.png') no-repeat center center"
        bgSize="cover"
      >
        <Spinner color="white" />
      </Flex>
    );
  }

  return (
    <Flex
      bg="url('/assets/home-bg.png') no-repeat center center"
      bgSize="cover"
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 80px)"
        width="calc(100vw - 80px)"
        margin="40px"
        zIndex="1000"
      >
        <Image
          src="/assets/logo.svg"
          alt=""
          width={305}
          height={180}
          style={{
            objectFit: "cover",
          }}
        />

        {user && balance?.gt(0) && (
          <Box w="100%" pos="absolute" top={0}>
            <Nav />
          </Box>
        )}

        {!user ? (
          address ? (
            <Button onClick={() => login({ chainId: ChainId.Goerli })}>
              Sign in
            </Button>
          ) : (
            <ConnectWallet />
          )
        ) : balance?.gt(0) ? (
          <Link href="/members" textDecor="none !important">
            <Text
              background="linear-gradient(93.33deg, #F213A4 1.94%, #7A66FF 100%)"
              backgroundClip="text"
              color="transparent"
              fontSize="lg"
              fontWeight="500"
              textAlign="center"
            >
              Enter
            </Text>
            <ArrowsIcon mt={2} />
          </Link>
        ) : ineligibility?.length === 0 ? (
          <Link href="/claim" textDecor="none !important">
            <Text
              background="linear-gradient(93.33deg, #F213A4 1.94%, #7A66FF 100%)"
              backgroundClip="text"
              color="transparent"
              fontSize="lg"
              fontWeight="500"
              textAlign="center"
            >
              Enter
            </Text>
            <ArrowsIcon mt={2} />
          </Link>
        ) : (
          <>
            <Text>No invite? Register here for future IRL events</Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
