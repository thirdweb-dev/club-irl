import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { GetServerSidePropsContext } from "next";
import { getUser } from "../../auth.config";
import events from "../../data/events.json";
import MainLayout from "../Layouts/MainLayout";

const Members: React.FC = () => {
  return (
    <MainLayout>
      <Container
        w="100%"
        mt={{ base: 0, md: "160px" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading
          size="3xl"
          mb="24px"
          textAlign="center"
          fontWeight="500"
          color="#FF84D4"
          textShadow="0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(255, 71, 191, 0.9)"
        >
          Member Events
        </Heading>
        <Text textAlign="center" fontSize="14px">
          Here&apos;s where you&apos;ll find upcoming clubIRL events. We&apos;ll
          keep adding events monthly so check back frequently!
        </Text>

        <Flex
          alignSelf="center"
          width="100vw"
          gap={10}
          px={{
            base: 0,
            md: 10,
          }}
          mt={10}
          flexWrap="wrap"
          justify="center"
          align="center"
        >
          {events.map((event) => (
            <Link
              isExternal
              key={event.link}
              href={event.link}
              textDecor="none !important"
            >
              <VStack
                bg="#111"
                borderColor="#222"
                borderWidth="2px"
                direction="row"
                borderRadius="lg"
                _hover={{
                  bg: "#222",
                  borderColor: "#333",
                }}
                h="370px"
                maxW="400px"
              >
                <Image
                  src={event.image}
                  alt={event.name}
                  width="350px"
                  h="210px"
                  objectFit="cover"
                  borderLeftRadius="lg"
                />
                <Flex
                  align="flex-start"
                  flexDir="column"
                  w="full"
                  px="6"
                  mt="6 !important"
                  gap={2}
                >
                  <Heading size="20px">{event.name}</Heading>
                  <Text color="#777777">{event.date}</Text>
                  <Button w="full">
                    <Text>Reserve your place</Text>
                  </Button>
                </Flex>
              </VStack>
            </Link>
          ))}
        </Flex>
        <Heading
          size="md"
          mt="24px"
          textAlign="center"
          fontWeight="500"
          color="#FF84D4"
          textShadow="0px 4px 10px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(255, 71, 191, 0.9)"
        >
          Dinner | Conversation | Networking
        </Heading>
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
    "polygon"
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
