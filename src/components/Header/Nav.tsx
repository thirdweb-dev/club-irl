import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import type { FC } from "react";
import { CalendarIcon, UserIcon, VIPIcon } from "../../Icons";

export const Nav: FC = () => {
  return (
    <Flex
      bg="black"
      w="100%"
      justify={{
        base: "center",
        md: "end",
      }}
      align="center"
      px={10}
      h={12}
      gap={8}
    >
      <Link href="/members" passHref>
        <Flex align="center" gap={2} cursor="pointer">
          <VIPIcon />
          <Text>Members Area</Text>
        </Flex>
      </Link>

      <Link href="/events" passHref>
        <Flex align="center" gap={2} cursor="pointer">
          <CalendarIcon />
          <Text>Events</Text>
        </Flex>
      </Link>

      <Link href="/profile" passHref>
        <Flex align="center" gap={2} cursor="pointer">
          <UserIcon />
          <Text>Profile</Text>
        </Flex>
      </Link>
    </Flex>
  );
};
