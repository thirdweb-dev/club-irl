import {
  ConnectWallet,
  useAddress,
  useEditionDrop,
  useLogin,
  useNFT,
} from "@thirdweb-dev/react";
import { Flex, Button, Spinner, Icon, Heading } from "@chakra-ui/react";
import { BsArrowRightShort } from "react-icons/bs";
import type { NextPage } from "next";
import { MembershipNFT } from "../components/MembershipNFT";

const Home: NextPage = () => {
  const address = useAddress();
  const login = useLogin();

  const contract = useEditionDrop(
    process.env.NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS || ""
  );
  const { data: nft, isLoading } = useNFT(contract, 0);

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
        {!address ? (
          <ConnectWallet />
        ) : (
          <Button
            width="200px"
            height="60px"
            fontSize="lg"
            bg="black !important"
            _hover={{ opacity: 0.86 }}
            rightIcon={<Icon as={BsArrowRightShort} boxSize={6} />}
            onClick={() => login()}
          >
            Enter
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
