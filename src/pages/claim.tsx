import {
  Button,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useContract,
  useNetwork,
  useNetworkMismatch,
  useNFTBalance,
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
  const [loading, setLoading] = useState(false);
  const { data: balance } = useNFTBalance(contract, address, "0");
  const router = useRouter();

  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const handleClaim = async () => {
    if (address && contract) {
      if (isMismatched) {
        // @ts-ignore
        return switchNetwork(ChainId.Polygon);
      }
      setLoading(true);
      try {
        await contract?.erc1155.claim(tokenId, 1);
        router.push("/members");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (balance?.gt(0)) {
      router.replace("/");
    }
  }, [balance, router]);

  return (
    <MainLayout>
      <Flex direction="column" align="center" w="100vw" justify="center">
        <VStack
          bg="rgba(0, 0, 0, 0.9)"
          filter="drop-shadow(0px 0px 50px #8B38FF)"
          w={{
            base: "90%",
            md: "580px",
          }}
          align="center"
          justify="center"
          p={10}
          rounded="xl"
        >
          <Heading
            fontWeight="500"
            fontSize="32px"
            color="#FF84D4"
            textAlign="center"
            textShadow="0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(255, 71, 191, 0.9)"
          >
            Claim your membership
          </Heading>
          <Text textAlign="center">
            You have been invited to join clubIRL. You can claim your membership
            below. Once you’ve done that, you can login with your wallet to
            access the Members Area.
          </Text>
          <ConnectWallet className="connect-wallet" />
          <Flex
            gap={4}
            w={{
              base: "300px",
              md: "250px",
            }}
          >
            <Button
              gap="2"
              bg="transparent"
              border="1px solid #F213A4"
              w="full"
              isDisabled={!address || loading || !contract}
              onClick={handleClaim}
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <VIPIcon />
                  <Text>Mint (FREE)</Text>
                </>
              )}
            </Button>
          </Flex>
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
    "polygon"
  );

  const contract = await sdk.getContract(
    process.env.NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS || "",
    "edition-drop"
  );
  const balance = await contract?.balanceOf(user.address, 0);
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
