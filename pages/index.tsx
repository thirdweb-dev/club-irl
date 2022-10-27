import {
  ConnectWallet,
  useAddress,
  useClaimIneligibilityReasons,
  useDisconnect,
  useEditionDrop,
  useLogout,
  useNFT,
  useNFTBalance,
  useUser,
} from "@thirdweb-dev/react";
import { Flex, Button, Spinner, Icon, Heading, Link } from "@chakra-ui/react";
import { BsArrowRightShort } from "react-icons/bs";
import { MdOutlineNoEncryptionGmailerrorred } from "react-icons/md";
import type { NextPage } from "next";
import { MembershipNFT } from "../components/MembershipNFT";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { user } = useUser();
  const logout = useLogout();
  const disconnect = useDisconnect();

  const contract = useEditionDrop(
    process.env.NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS || ""
  );
  const { data: nft, isLoading } = useNFT(contract, 0);
  const { data: balance } = useNFTBalance(contract, user?.address, "0");
  const { data: ineligibility } = useClaimIneligibilityReasons(
    contract,
    { walletAddress: user?.address || "", quantity: 1 },
    "0"
  );

  useEffect(() => {
    if (user) {
      logout();
    }
  }, []);

  if (isLoading || !nft) {
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
        bg="black"
      >
        <Spinner color="white" />
      </Flex>
    );
  }

  return (
    <Flex bg="black">
      <MembershipNFT position="fixed" top="0" left="0" margin="40px" />
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 80px)"
        width="calc(100vw - 80px)"
        margin="40px"
        zIndex="1000"
      >
        <Heading size="4xl" mb="32px">
          Club IRL
        </Heading>
        {!user ? (
          <ConnectWallet />
        ) : balance?.gt(0) ? (
          <Link href="/members" textDecor="none !important">
            <Button
              width="240px"
              height="60px"
              fontSize="lg"
              bg="black !important"
              _hover={{ opacity: 0.86 }}
              rightIcon={<Icon as={BsArrowRightShort} boxSize={6} />}
            >
              Access Granted
            </Button>
          </Link>
        ) : ineligibility?.length === 0 ? (
          <Link href="/claim" textDecor="none !important">
            <Button
              width="240px"
              height="60px"
              fontSize="lg"
              bg="black !important"
              _hover={{ opacity: 0.86 }}
              rightIcon={<Icon as={BsArrowRightShort} boxSize={6} />}
            >
              Claim Membership
            </Button>
          </Link>
        ) : (
          <Button
            width="240px"
            height="60px"
            fontSize="lg"
            bg="black !important"
            _hover={{ opacity: 0.86 }}
            rightIcon={
              <Icon as={MdOutlineNoEncryptionGmailerrorred} boxSize={4} />
            }
            onClick={disconnect}
          >
            Access Denied
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
