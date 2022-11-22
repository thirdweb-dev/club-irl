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
          clubIRL is an invite only community for which brings together
          founders, builders, and leaders from top global brands, hot startups,
          and web3 innovators for IRL experiences.
          <br />
          <br />
          clubIRL events will feature a series of global dinners and private
          events that facilitate networking, collaboration and open discussions.
          <br />
          <br />
          As a member you&apos;ll have access to a global schedule of exclusive
          events as well as opportunities to influence the direction of clubIRL
          and invite new members to join our club.
          <br />
          <br />
          Check back here for updates on events, membership directory, and
          private clubIRL channels.
        </Text>
        <Flex w="full" align="center" justify="space-between">
          {cards.map(({ title, link, icon }) => (
            <Link href={link} passHref key={title}>
              <VStack
                mt="24px"
                spacing="16px"
                bg="rgba(0, 0, 0, 0.9)"
                boxShadow="0px 0px 50px #8B38FF"
                borderRadius="28px"
                align="center"
                justify="center"
                padding="10px"
                height={{ base: "140px", md: "180px" }}
                width={{ base: "140px", md: "180px" }}
              >
                <Image src={icon} alt="calendar" w="50px" />
                <Text width={{ base: "120px", md: "100%" }} textAlign="center">
                  {title}
                </Text>
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
          padding="20px"
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
              Your clubIRL pass will give you priority access to all clubIRL
              events as well as other unique opportunities. Sometimes you
              won&apos;t even need to register, just show your pass and skip the
              line. More to come soon...
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
