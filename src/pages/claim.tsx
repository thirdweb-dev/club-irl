import {
  Button,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useNFTBalance,
  useTotalCirculatingSupply,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";
import React, { useEffect, useState } from "react";
import { getUser } from "../../auth.config";
import { VIPIcon } from "../Icons/VIP";
import MainLayout from "../Layouts/MainLayout";

const Claim: React.FC = () => {
  const address = useAddress();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS || "",
    "edition-drop"
  );
  const tokenId = 0;
  const { data: claimedSupply } = useTotalCirculatingSupply(contract, tokenId);

  const { data: balance } = useNFTBalance(contract, address, "0");
  const router = useRouter();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (balance?.gt(0)) {
      router.replace("/");
    }
  }, [balance, router]);

  return (
    <MainLayout showNav>
      <Flex
        direction="column"
        align="center"
        h="100vh"
        w="100vw"
        justify="center"
      >
        <VStack
          bg="rgba(0, 0, 0, 0.9)"
          filter="drop-shadow(0px 0px 50px #8B38FF)"
          maxW="580px"
          align="center"
          justify="center"
          p={10}
          rounded="xl"
        >
          <Heading
            fontWeight="500"
            fontSize="32px"
            color="#FF84D4"
            textShadow="0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(255, 71, 191, 0.9)"
          >
            Claim your membership
          </Heading>
          <Text textAlign="center">
            You have been invited to join Club IRL. You can claim your
            membership below. Once you’ve done that, you can login with your
            wallet to access the private community.
          </Text>
          <ConnectWallet className="connect-wallet" />
          <Flex gap={4}>
            <NumberInput
              defaultValue={1}
              min={1}
              maxW="70px"
              borderColor="#4B3678"
            >
              <NumberInputField
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
              <NumberInputStepper borderColor="#4B3678">
                <NumberIncrementStepper
                  borderBottom="none"
                  borderColor="#4B3678"
                />
                <NumberDecrementStepper
                  borderTop="none"
                  borderColor="#4B3678"
                />
              </NumberInputStepper>
            </NumberInput>
            <Button gap="2" bg="transparent" border="1px solid #F213A4">
              <VIPIcon />
              <Text>Mint (FREE)</Text>
            </Button>
          </Flex>
          {claimedSupply && (
            <Text color="#AC46FF">{claimedSupply?.toString()} Minted</Text>
          )}
        </VStack>
      </Flex>
    </MainLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await getUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_PRIVATE_KEY || "",
    "goerli"
  );

  const contract = await sdk.getEditionDrop(
    process.env.NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS || ""
  );
  const balance = await contract.balanceOf(user.address, 0);
  const hasNft = balance.gt(0);

  if (hasNft) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const canClaim = await contract.claimConditions.canClaim(0, 1, user.address);

  if (!canClaim) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Claim;