import { Center, Heading, Flex, Text, Link } from "@chakra-ui/react";
import { useAddress, useEditionDrop, useNFTBalance } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";
import { useEffect } from "react";
import { getUser } from "../auth.config";

const Claim: React.FC = () => {
  const address = useAddress();
  const contract = useEditionDrop(
    process.env.NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS || ""
  );
  const { data: balance } = useNFTBalance(contract, address, "0");
  const router = useRouter();

  useEffect(() => {
    if (balance?.gt(0)) {
      router.replace("/");
    }
  }, [balance, router]);

  return (
    <Center width="100vw" height="100vh" bg="black">
      <Flex direction="column" align="center">
        <Heading>Claim Membership</Heading>
        <Text maxW="600px" textAlign="center" mb="32px">
          Congratulations, you have been invited to join Club IRL.
          <br />
          You can claim your membership below.
          <br />
          <br />
          Once you claim, you can continue to the{" "}
          <Link href="/" fontWeight="bold">
            home page
          </Link>{" "}
          where you can login in with your wallet to access the private
          community.
        </Text>
        <iframe
          src="https://gateway.ipfscdn.io/ipfs/QmPaVYdGue8zEXFKqrtVHpvzBvufM1DYzw5n1of3KVPG88/edition-drop.html?contract=0x218181d6Ad4f753dBd13e735f8523a819eCB696f&chainId=5&tokenId=0&theme=dark"
          width="600px"
          height="600px"
          style={{
            maxWidth: "100%",
          }}
          frameBorder="0"
        ></iframe>
      </Flex>
    </Center>
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
