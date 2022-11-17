import {
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { getUser } from "../../auth.config";
import MainLayout from "../Layouts/MainLayout";

const cards = [
  {
    link: "/events",
    title: "View events",
    icon: "/assets/icons/Calendar.svg",
  },
  {
    link: "/profile",
    title: "Update profile",
    icon: "/assets/icons/Cog.svg",
  },
];

const Members: React.FC = () => {
  return (
    <MainLayout>
      <Container maxW="500px" display="flex" flexDirection="column">
        <Heading
          size="3xl"
          mb="24px"
          textAlign="center"
          fontWeight="500"
          color="#FF84D4"
          textShadow="0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(255, 71, 191, 0.9)"
        >
          Members area
        </Heading>
        <Text textAlign="center" fontSize="14px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id egestas
          est. Fusce condimentum erat eget sollicitudin sollicitudin. Sed auctor
          condimentum enim ut ultrices.
        </Text>
        <Flex w="full" align="center" justify="space-between">
          {cards.map(({ title, link, icon }) => (
            <Link href={link} passHref key={title}>
              <VStack
                mt="24px"
                spacing="24px"
                bg="rgba(0, 0, 0, 0.9)"
                boxShadow="0px 0px 50px #8B38FF"
                borderRadius="28px"
                align="center"
                justify="center"
                w="175px"
                h="175px"
              >
                <Image src={icon} alt="calendar" w="60px" />
                <Text>{title}</Text>
              </VStack>
            </Link>
          ))}
        </Flex>

        <Flex
          w="full"
          align="center"
          justify="space-between"
          bg="rgba(0, 0, 0, 0.9)"
          boxShadow="0px 0px 50px #8B38FF"
          borderRadius="28px"
          mt="24px"
          gap="24px"
          h="220px"
          p={6}
        >
          <Flex flexDir="column">
            <Text
              color="#FF84D4"
              textShadow="0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(255, 71, 191, 0.9)"
            >
              VIP PASS
            </Text>
            <Text fontSize={{ base: "14px", md: "16px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id
              egestas est. Fusce condimentum erat eget sollicitudin
              sollicitudin.
            </Text>
          </Flex>
          <Image src="/assets/icons/vip.svg" alt="calendar" w="100px" />
        </Flex>
      </Container>
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

  const contract = await sdk.getContract(
    process.env.NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS || "",
    "edition-drop"
  );
  const balance = await contract.balanceOf(user.address, 0);
  const hasNft = balance.gt(0);

  if (!hasNft) {
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

export default Members;
