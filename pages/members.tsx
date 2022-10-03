import {
  Flex,
  Container,
  Stack,
  Image,
  Text,
  Heading,
  Link,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { GetServerSidePropsContext } from "next";
import { getUser } from "../auth.config";
import { IoIosPin } from "react-icons/io";
import { AnimateText } from "../components/AnimateText";
import { MembershipNFT } from "../components/MembershipNFT";
import { Pattern } from "../components/Pattern";
import events from "../data/events.json";

const Members: React.FC = () => {
  return (
    <Flex
      width="100vw"
      minHeight="100vh"
      align="center"
      direction="column"
      py="80px"
      bg="black"
    >
      <Container maxW="720px">
        <Heading size="3xl" mb="24px" textAlign="center">
          Membership
        </Heading>

        <Stack mt="32px" spacing={8} align="center">
          <Text textAlign="center">
            Welcome to Club IRL
            <br />
            <br />
            This is an exclusive club for web3 <strong>executives</strong>
            ,&nbsp;
            <strong>founders</strong>, and <strong>decision-makers</strong> to
            regularly exchange ideas, collaborate, and work toward the
            advancement of the web3 industry.
            <br />
            <br />
            The pass that you&apos;ve all claimed represents your membership to
            this community, and will grant you continued access to our{" "}
            <strong>VIP events</strong>, <strong>dinners</strong>, and{" "}
            <strong>opportunities</strong>.
          </Text>
          <MembershipNFT height="240px" width="240px" borderRadius="2xl" />
        </Stack>

        <Pattern />
      </Container>

      <Container maxW="720px" mt="160px" display="flex" flexDirection="column">
        <Heading size="3xl" mb="24px" textAlign="center">
          Events
        </Heading>
        <AnimateText delay="60s" mb="32px">
          COCKTAILS • NETWORKING • DINNER • COCKTAILS • NETWORKING • DINNER
          •&nbsp;COCKTAILS • NETWORKING • DINNER • COCKTAILS • NETWORKING •
          DINNER •&nbsp;COCKTAILS • NETWORKING • DINNER • COCKTAILS • NETWORKING
          • DINNER •&nbsp;COCKTAILS • NETWORKING • DINNER • COCKTAILS •
          NETWORKING • DINNER •&nbsp;
        </AnimateText>
        <Stack spacing={8} alignSelf="center" width="100%">
          {events.map((event) => (
            <Link
              isExternal
              key={event.link}
              href={event.link}
              textDecor="none !important"
            >
              <Stack
                spacing={5}
                bg="#111"
                borderColor="#222"
                borderWidth="2px"
                direction="row"
                borderRadius="lg"
                _hover={{
                  bg: "#222",
                  borderColor: "#333",
                }}
              >
                <Image
                  src={event.image}
                  alt={event.name}
                  height="200px"
                  width="200px"
                  objectFit="cover"
                  borderLeftRadius="lg"
                />
                <Stack padding="20px" paddingLeft="4px">
                  <Heading>{event.name}</Heading>
                  <Text>{event.date}</Text>
                  <HStack>
                    <Icon as={IoIosPin} boxSize={5} />
                    <Text color="#666">{event.location}</Text>
                  </HStack>
                </Stack>
              </Stack>
            </Link>
          ))}
        </Stack>
      </Container>
    </Flex>
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
